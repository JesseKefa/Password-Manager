"use strict";

let expect = require('expect.js');
const PasswordManager = require('../password-manager');

function expectReject(promise) {
    return promise.then(
        (result) => expect().fail(`Expected failure, but function returned ${result}`),
        (error) => {
            // Log the expected rejection error if needed for debugging
            console.log('Expected rejection:', error);
        },
    );
}

describe('Password manager', async function() {
    this.timeout(5000);
    let password = "password123!";

    let kvs = {
        "service1": "value1",
        "service2": "value2",
        "service3": "value3"
    };

    describe('functionality', async function() {

        it('inits without an error', async function() {
            await PasswordManager.init(password);
        });

        it('can set and retrieve a password', async function() {
            let keychain = await PasswordManager.init(password);
            let url = 'www.stanford.edu';
            let pw = 'sunetpassword';
            await keychain.set(url, pw);
            expect(await keychain.get(url)).to.equal(pw);
        });

        it('can set and retrieve multiple passwords', async function() {
            let keychain = await PasswordManager.init(password);
            for (let k in kvs) {
                await keychain.set(k, kvs[k]);
            }
            for (let k in kvs) {
                expect(await keychain.get(k)).to.equal(kvs[k]);
            }
        });

        it('returns null for non-existent passwords', async function() {
            let keychain = await PasswordManager.init(password);
            for (let k in kvs) {
                await keychain.set(k, kvs[k]);
            }
            expect(await keychain.get('www.stanford.edu')).to.be(null);
        });

        it('can remove a password', async function() {
            let keychain = await PasswordManager.init(password);
            for (let k in kvs) {
                await keychain.set(k, kvs[k]);
            }
            expect(await keychain.remove('service1')).to.be(true);
            expect(await keychain.get('service1')).to.be(null);
        });

        it('returns false if there is no password for the domain being removed', async function() {
            let keychain = await PasswordManager.init(password);
            for (let k in kvs) {
                await keychain.set(k, kvs[k]);
            }
            expect(await keychain.remove('www.stanford.edu')).to.be(false);
        });

        it('can dump and restore the database', async function() {
            let keychain = await PasswordManager.init(password);
            for (let k in kvs) {
                await keychain.set(k, kvs[k]);
            }
            let data = await keychain.dump();
            let contents = data[0];
            let checksum = data[1];
            let newKeychain = await PasswordManager.load(password, contents, checksum);

            // Check if the dumped contents can be parsed without errors
            let parseError;
            try {
                JSON.parse(contents);
            } catch (e) {
                parseError = e;
            }
            expect(parseError).to.be(undefined);  // Ensure no parsing errors occur
            
            for (let k in kvs) {
                expect(await newKeychain.get(k)).to.equal(kvs[k]);
            }
        });

        it('fails to restore the database if checksum is wrong', async function() {
            let keychain = await PasswordManager.init(password);
            for (let k in kvs) {
                await keychain.set(k, kvs[k]);
            }
            let data = await keychain.dump();
            let contents = data[0];
            let fakeChecksum = '3GB6WSm+j+jl8pm4Vo9b9CkO2tZJzChu34VeitrwxXM=';
            await expectReject(PasswordManager.load(password, contents, fakeChecksum));
        });

        it('returns false if trying to load with an incorrect password', async function() {
            let keychain = await PasswordManager.init(password);
            for (let k in kvs) {
                await keychain.set(k, kvs[k]);
            }
            let data = await keychain.dump();
            let contents = data[0];
            let checksum = data[1];
            await expectReject(PasswordManager.load("fakepassword", contents, checksum));
        });
    });

    describe('security', async function() {

        it("doesn't store domain names and passwords in the clear", async function() {
            let keychain = await PasswordManager.init(password);
            let url = 'www.stanford.edu';
            let pw = 'sunetpassword';
            await keychain.set(url, pw);
            let data = await keychain.dump();
            let contents = data[0];
            expect(contents).not.to.contain(password);  // Ensure password is not in clear text
            expect(contents).not.to.contain(url);      // Ensure URL is not in clear text
            expect(contents).not.to.contain(pw);       // Ensure password is not in clear text
        });

        it('includes a kvs object in the serialized dump', async function() {
            let keychain = await PasswordManager.init(password);
            for (let i = 0; i < 10; i++) {
                await keychain.set(String(i), String(i));
            }
            let data = await keychain.dump();
            let contents = data[0];
            let contentsObj = JSON.parse(contents);
            expect(contentsObj).to.have.key('kvs');
            expect(contentsObj.kvs).to.be.an('object');
            expect(Object.getOwnPropertyNames(contentsObj.kvs)).to.have.length(10);
        });

    });
});
