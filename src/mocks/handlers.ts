import { http, HttpResponse } from 'msw';
import { db } from './db';

export const handlers = [
  // Users
  http.get('*/users', () => {
    return HttpResponse.json(db.getUsers(), { status: 200 });
  }),
  http.post('*/users', async ({ request }) => {
    const newUser = await request.json();
    const createdUser = db.addUser(newUser);
    return HttpResponse.json(createdUser, { status: 201 });
  }),

  // Products
  http.get('*/products', () => {
    return HttpResponse.json(db.getProducts(), { status: 200 });
  }),
  http.post('*/products', async ({ request }) => {
    const newProduct = await request.json();
    const createdProduct = db.addProduct(newProduct);
    return HttpResponse.json(createdProduct, { status: 201 });
  }),
];
