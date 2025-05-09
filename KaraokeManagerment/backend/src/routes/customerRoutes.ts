import { Router } from 'express';
import CustomerController from '../controllers/customerController';

const router = Router();
const customerController = new CustomerController();

// Make all routes public temporarily
router.post('/auth/login', customerController.login.bind(customerController));
router.post('/auth/register', customerController.register.bind(customerController));
router.get('/customers/:id', customerController.getCustomerById.bind(customerController));
router.put('/customers/:id', customerController.updateCustomer.bind(customerController));
router.get('/customers', customerController.getAllCustomers.bind(customerController));
router.delete('/customers/:id', customerController.deleteCustomer.bind(customerController));

export default router;