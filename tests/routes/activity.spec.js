const { expect } = require('chai');
const { Actividad, conn } = require('../../src/db.js');



describe("Activity routes", () => {
    let response;
    before(() =>
      conn.authenticate().catch((err) => {
        console.error("Unable to connect to the database:", err);
      })
    );
    beforeEach(() =>
      Actividad.sync({ force: true })
        .then(() =>
          Actividad.create({
            name: "Rafting",
            dificultad: "3",
            duracion: "01:30",
            temporada: "Verano"
          })
        )
        .then(async (resp) => {
          response = resp;
        })
    );
  
 describe("POST /activity", () => {
  it("Name must be Rafting", () => expect(response.name).equals("Rafting"));
  it("Dificultad must be '3'", () => expect(response.dificultad).equals("3"));
  it("Duracion must be 01:30", () => expect(response.duracion).equals("01:30"));
  it("Temporada must be 'Verano'", () => expect(response.temporada).equals("Verano"));

});
});