import sinon from 'sinon';
import * as ExplorerLookup from '@blockcerts/explorer-lookup';
import fixture from '../fixtures/v3/proof-chain-example.json';
import { BLOCKCHAINS, Certificate } from '../../src';
import domain from '../../src/domain';
import { universalResolverUrl } from '../../src/domain/did/valueObjects/didResolver';
import didDocument from '../fixtures/did/did:ion:EiA_Z6LQILbB2zj_eVrqfQ2xDm4HNqeJUw5Kj2Z7bFOOeQ.json';
import fixtureIssuerProfile from '../assertions/v3.0-issuer-profile.json';
import v3RevocationList from '../assertions/v3-revocation-list';

describe('Certificate API Contract test suite', function () {
  describe('signers property', function () {
    describe('given there is only one signature to the V3 document', function () {
      let instance;

      beforeEach(async function () {
        const requestStub = sinon.stub(ExplorerLookup, 'request');
        requestStub.withArgs({
          url: `${universalResolverUrl}/did:ion:EiA_Z6LQILbB2zj_eVrqfQ2xDm4HNqeJUw5Kj2Z7bFOOeQ`
        }).resolves(JSON.stringify({ didDocument }));
        requestStub.withArgs({
          url: 'https://www.blockcerts.org/samples/3.0/issuer-blockcerts.json'
        }).resolves(JSON.stringify(fixtureIssuerProfile));
        requestStub.withArgs({
          url: 'https://www.blockcerts.org/samples/3.0/revocation-list-blockcerts.json'
        }).resolves(JSON.stringify(v3RevocationList));
        // sinon.stub(domain.verifier, 'lookForTx').resolves({
        //   remoteHash: '68df661ae14f926878aabbe5ca33e46376e8bfb397c1364c2f1fa653ecd8b4b6',
        //   issuingAddress: 'mgdWjvq4RYAAP5goUNagTRMx7Xw534S5am',
        //   time: '2022-04-05T18:45:30.000Z',
        //   revokedAddresses: ['mgdWjvq4RYAAP5goUNagTRMx7Xw534S5am']
        // });
        instance = new Certificate(fixture);
        await instance.init();
        await instance.verify();
      });

      afterEach(function () {
        instance = null;
        sinon.restore();
      });

      describe('ED25519 signature', function () {
        it('should expose the signingDate', function () {
          expect(instance.signers[0].signingDate).toBe('2022-05-02T16:36:22.933Z');
        });

        it('should expose the signatureSuiteType', function () {
          expect(instance.signers[0].signatureSuiteType).toBe('Ed25519Signature2020');
        });

        it('should expose the issuerPublicKey', function () {
          expect(instance.signers[0].issuerPublicKey).toBe('z6MkjHnntGvtLjwfAMHWTAXXGJHhVL3DPtaT9BHmyTjWpjqs');
        });

        it('should expose the issuerName', function () {
          // TODO: test a case where the issuerName would be properly set
          expect(instance.signers[0].issuerName).toBe('');
        });

        it('should expose the issuerProfileDomain', function () {
          expect(instance.signers[0].issuerProfileDomain).toBe('');
        });

        it('should expose the issuerProfileUrl', function () {
          expect(instance.signers[0].issuerProfileUrl).toBe('');
        });
      });

      describe('MerkleProof2019 signature', function () {
        it('should expose the signingDate', function () {
          expect(instance.signers[1].signingDate).toBe('2022-05-03T12:23:08.253777');
        });

        it('should expose the signatureSuiteType', function () {
          expect(instance.signers[1].signatureSuiteType).toBe('MerkleProof2019');
        });

        it('should expose the issuerPublicKey', function () {
          expect(instance.signers[1].issuerPublicKey).toBe('mgdWjvq4RYAAP5goUNagTRMx7Xw534S5am');
        });

        it('should expose the issuerName', function () {
          expect(instance.signers[1].issuerName).toBe('Blockcerts Organization');
        });

        it('should expose the issuerProfileDomain', function () {
          expect(instance.signers[1].issuerProfileDomain).toBe('www.blockcerts.org');
        });

        it('should expose the issuerProfileUrl', function () {
          expect(instance.signers[1].issuerProfileUrl).toBe('https://www.blockcerts.org/samples/3.0/issuer-blockcerts.json');
        });

        it('should expose the chain', function () {
          expect(instance.signers[1].chain).toBe(BLOCKCHAINS.testnet);
        });

        it('should expose the transactionId', function () {
          expect(instance.signers[1].transactionId).toBe('26f18f59e6ed27f8f2122fb8d78ccb93e5fa6518ff35c81dbf292abae4524b98');
        });

        it('should expose the transactionLink', function () {
          expect(instance.signers[1].transactionLink).toBe('https://testnet.blockchain.info/tx/26f18f59e6ed27f8f2122fb8d78ccb93e5fa6518ff35c81dbf292abae4524b98');
        });
      });
    });
  });
});
