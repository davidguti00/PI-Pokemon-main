/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Pokemon, conn } = require('../../src/db.js');

const agent = session(app);
const pokemon = {
  name: "pikachu",
	hp: 100,
	attack: 120,
	defense: 70,
	speed: 50,
	height: 40,
	weight: 40,
	image: "url.png",
	types: ["fire", "water"],
};

describe('Pokemon routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Pokemon.sync({ force: true })
    .then(() => Pokemon.create(pokemon)));
  describe('GET /pokemon', () => {
    it('Test', (done) => { 
      it('should get 200', async () => await agent.get('/pokemon').expect(200));
      done();
      }).timeout(10000);
    
  });
  describe("GET /pokemon?name=testname", () => {
		it("should get 200", async () => await agent.get("/pokemon?name=pikachu").expect(200));
	});
	describe("GET /pokemon/:id", () => {
		it("should get 200", async () => await agent.get("/pokemon/1").expect(200));
	});
  /**Test /types */
	describe("GET /type", () => {
    it('Test', (done) => { 
		it("should get 200", () => agent.get("/type").expect(200));
    done();
  }).timeout(10000);
	});
});
