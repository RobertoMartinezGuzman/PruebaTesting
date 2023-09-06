const request = require("supertest");
const server = require("../index");

describe("Operaciones CRUD de cafes", () => {

// Ejercicio 1.- Testea que la ruta GET /cafes devuelve un status code 200 y el tipo de dato recibido es un arreglo con por lo menos 1 objeto.

it ('Ruta get/cafes retorna code 200 y tipo de dato recibido es un arreglo con por lo menos 1 objeto (no vacio)', async() => {
    
    const response = await request(server).get('/cafes').send();// se obtiene el response a la consulta get(/cafes)
    const body = response.body;
    expect(body).toBeInstanceOf(Array);
    expect(body.length).toBeGreaterThan(0);

    const codigo = response.statusCode;
    expect(codigo).toBe(200);
});

// Ejercicio 2.- Comprueba que se obtiene un código 404 al intentar eliminar un café con un id que no existe.

it('Al eliminar un cafe con un id inexistente, la ruta delete/cafes:id obtiene un codigo 404', async () => {
    const jwt = 'token';
    const response = await request(server)
      .delete('/cafes/10') // se considera un id que no existe, en este caso id = 10
      .set('authorization', jwt)
      .send();

    const codigo = response.statusCode;
    expect(codigo).toBe(404); // entrega codigo 404
  });


// Ejercicio 3.- Prueba que la ruta POST /cafes agrega un nuevo café y devuelve un código 201.

it('La ruta post/cafes agrega un nuevo cafe devolviendo un condigo 201', async () => {
    const agregaCafe = { id: 5, nombre: 'Latte' }; // se agrega un nuevo cafe con id 5 y nombre Latte (ejemplo)
    const response = await request(server)
        .post('/cafes')
        .send(agregaCafe)
    const codigo = response.statusCode;
    expect(codigo).toBe(201); // entrega codigo 404
  });

// Ejercicio 4.- Prueba que la ruta PUT /cafes devuelve un status code 400 si intentas actualizar un café enviando un id en los parámetros que sea diferente al id dentro del payload.

it('Al actualizar un cafe enviando un id con parametros diferentes al id dentro del payload, la ruta put/cafes retorna un codigo 400 ', async () => {
    const modificacion = { id: 2, nombre: 'Frappe' }; // se considera id 2 con nombre del cafe Frappe 
    const id=1; // id de ejemplo
    const response = await request(server)
      .put(`/cafes/$"id`) 
      .send(modificacion); // se envia id en parametros diferentes al id dentro del payload 
    const codigo = response.statusCode;
    expect(codigo).toBe(400); // entrega codigo 400
  });
});
