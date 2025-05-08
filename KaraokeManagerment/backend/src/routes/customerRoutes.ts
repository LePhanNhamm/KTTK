import { Router } from 'express';
import CustomerController from '../controllers/customerController';
import { auth, adminAuth, selfOrAdminAuth } from '../middlewares/authMiddleware';

const router = Router();
const customerController = new CustomerController();

// Public routes
router.post('/auth/login', customerController.login.bind(customerController));
router.post('/auth/register', customerController.register.bind(customerController));

// Protected routes - require authentication
router.get('/profile', auth, customerController.getProfile.bind(customerController));
router.put('/profile', auth, customerController.updateProfile.bind(customerController));

// Protected routes - require self or admin access
router.get('/customers/:id', selfOrAdminAuth, customerController.getCustomerById.bind(customerController));
router.put('/customers/:id', selfOrAdminAuth, customerController.updateCustomer.bind(customerController));

// Admin only routes
router.get('/customers', adminAuth, customerController.getAllCustomers.bind(customerController));
router.delete('/customers/:id', adminAuth, customerController.deleteCustomer.bind(customerController));

export default router;