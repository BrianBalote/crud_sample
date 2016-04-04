package crud.sample.controllers;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.PostConstruct;
import javax.servlet.http.HttpServletResponse;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import crud.sample.models.Customer;

@ComponentScan("crud.sample.services.impl")
@RestController
public class CustomerControllerImpl {

	// TODO replace with persistence layer
	private List<Customer> customerList;

	@RequestMapping(value = "/customer-list")
	public List<Customer> customerList() {

		return customerList;
	}

	@RequestMapping(value = "/add-customer", method = RequestMethod.POST)
	public ResponseEntity<Customer> addCustomer(@RequestBody Customer customer) {

		this.customerList.add(customer);

		return new ResponseEntity<Customer>(customer, HttpStatus.OK);
	}

	@RequestMapping(value = "/delete-customer{id}", method = RequestMethod.DELETE)
	public HttpStatus deleteCustomer(@PathVariable("id") String id, HttpServletResponse httpResponse) {

		HttpStatus httpStatus = HttpStatus.NOT_FOUND;

		try {

			for (Customer c : this.customerList) {

				if (c.getId().trim().equalsIgnoreCase(id.trim())) {

					this.customerList.remove(c);
					httpStatus = HttpStatus.OK;
					break;
				}
			}

		} catch (Exception e) {

			httpStatus = HttpStatus.CONFLICT;
		}

		return httpStatus;
	}

	@RequestMapping(value = "/update-customer", method = RequestMethod.POST)
	public ResponseEntity<Customer> updateCustomer(@RequestBody Customer customer) {

		HttpStatus httpStatus = HttpStatus.NOT_FOUND;

		try {

			for (int i = 0; i < this.customerList.size(); i++) {

				Customer c = this.customerList.get(i);

				if (c.getId().trim().equalsIgnoreCase(customer.getId())) {

					customerList.set(i, customer);
					httpStatus = HttpStatus.OK;
					break;
				}
			}

		} catch (Exception e) {
			httpStatus = HttpStatus.CONFLICT;
		}

		return new ResponseEntity<Customer>(customer, httpStatus);
	}

	@PostConstruct
	public void populateList() {

		this.customerList = new ArrayList<Customer>();

		Customer c1 = new Customer();
		c1.setId(String.valueOf(System.currentTimeMillis()));
		c1.setFirstName("Steve");
		c1.setLastName("Fox");
		c1.setMiddleName("Williams");
		c1.setStreetAddress("Block 1 Lot 2 Sway St.");
		c1.setCity("Makati");
		c1.setState("Manila");
		c1.setCountry("Philippines");
		c1.setZipCode("1234");
		c1.setPhoneNumber("333-123-7890");

		this.customerList.add(c1);
	}
}
