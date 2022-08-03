const { Pokemon, conn } = require('../../src/db.js');
const { expect } = require('chai');

describe('Pokemon model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => Pokemon.sync({ force: true }));
    describe('name', () => {
      it('should throw an error if name is null', (done) => {
        Pokemon.create({})
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });
      it('should work when its a valid name', () => {
        Pokemon.create({ name: 'Pikachu' });
      });
    });
    describe("create a new pokemon", () => {
			it("should work when its a valid pokemon", () => {
				Pokemon.create({
					name: "charmander",
					hp: 80,
					attack: 70,
					defense: 30,
					speed: 30,
					height: 30,
					weight: 30,
					image: "imagen.png",
					types: ["fire", "water"],
				});
			});
		});
  });
});
