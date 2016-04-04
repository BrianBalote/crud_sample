package crud.sample.controllers.api;

import crud.sample.models.Customer;

public interface ICustomerController {

	public void createCustomer();

	public void updateCustomer();

	public Customer searchCustomer();

	public void deleteCustomer();
}
