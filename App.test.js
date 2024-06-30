import { render, screen, fireEvent, waitFor  } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from './App';

  describe('App Component', () => {

    test('intially render shows user information in table rows',()=>{
      render(<App/>)

      const row1=screen.getByTestId('row-1')
      expect(row1).toHaveTextContent('Sana');
      expect(row1).toHaveTextContent('Sana'); 
      expect(row1).toHaveTextContent('Sana@example.com'); 
      expect(row1).toHaveTextContent('987'); 
      expect(row1).toHaveTextContent('Punjab');


      const row2=screen.getByTestId('row-2')
      expect(row2).toHaveTextContent('Aman');
      expect(row2).toHaveTextContent('Sharma'); 
      expect(row2).toHaveTextContent('Sharma@example.com'); 
      expect(row2).toHaveTextContent('987'); 
      expect(row2).toHaveTextContent('Panchkula');
    });

    test('clicking Add User button shows the form and hides the Add button', () => {
      render(<App />);
      
      const addButton = screen.getByTestId('addUser-button');
      fireEvent.click(addButton);

      const form = screen.getByTestId('user-form');
      expect(addButton).not.toBeVisible();
      expect(form).toBeVisible();
    });

    test("form add new user in the table ",async()=>{

      render(<App/>)

      const addButton = screen.getByTestId('addUser-button');
      fireEvent.click(addButton);

      const firstNameInput = screen.getByTestId('firstName-input');
      fireEvent.change( firstNameInput,{target:{value:'Naman'}})

      const lastNameInput = screen.getByTestId('lastName-input');
      fireEvent.change(lastNameInput,{target:{value:'Dubey'}})

      const emailInput = screen.getByTestId('email-input');
      fireEvent.change(emailInput,{target:{value:'Dubey@example.com'}})
  
      const addressInput= screen.getByTestId('address-input');
      fireEvent.change(addressInput,{target:{value:'Mohali'}})

      const contactInput = screen.getByTestId('contact-input');
      fireEvent.change(contactInput,{target:{value:'9592'}})

      const submitButton = screen.getByTestId('submit-button');
      fireEvent.click(submitButton)
    await waitFor(() => {
      const newRow=screen.getByTestId('row-3')
      expect( newRow).toHaveTextContent('Naman');
      expect( newRow).toHaveTextContent('Dubey'); 
      expect( newRow).toHaveTextContent('Dubey@example.com'); 
      expect( newRow).toHaveTextContent('9592'); 
      expect( newRow).toHaveTextContent('Mohali');
  });
})
    test('clicking Edit button shows editable form fields', () => {
      render(<App />);
  
      const editButton = screen.getByTestId('edit-button-1');
      fireEvent.click(editButton);
  
      expect(screen.getByTestId('edit-firstName')).toBeVisible();
      expect(screen.getByTestId('edit-lastName')).toBeVisible();
      expect(screen.getByTestId('edit-email')).toBeVisible();
      expect(screen.getByTestId('edit-contact')).toBeVisible();
      expect(screen.getByTestId('edit-address')).toBeVisible();
    });


    test('clicking Delete button removes the userdata from  the table', () => {
      render(<App />);
  
      const deleteButton = screen.getByTestId('delete-button-1');
      fireEvent.click(deleteButton);
  
      expect(screen.queryByTestId('row-1')).not.toBeInTheDocument();
    });

    test('clicking Save button updates the user information', () => {
      render(<App />);
  
      const editButton = screen.getByTestId('edit-button-1');
      fireEvent.click(editButton);
  
      fireEvent.change(screen.getByTestId('edit-firstName'), { target: { value: 'Jane' } });
      fireEvent.change(screen.getByTestId('edit-lastName'), { target: { value: 'Smith' } });
      fireEvent.change(screen.getByTestId('edit-email'), { target: { value: 'jane.smith@example.com' } });
      fireEvent.change(screen.getByTestId('edit-contact'), { target: { value: '5555678' } });
      fireEvent.change(screen.getByTestId('edit-address'), { target: { value: '456 Elm St' } });
  
      const saveButton = screen.getByTestId('save-button');
      fireEvent.click(saveButton);
      
     
      const row = screen.getByTestId('row-1');
      expect(row).toHaveTextContent('Jane');
      expect(row).toHaveTextContent('Smith');
      expect(row).toHaveTextContent('jane.smith@example.com');
      expect(row).toHaveTextContent('5555678');
      expect(row).toHaveTextContent('456 Elm St');
    });




    test('clicking on cancel button and reverts the original row',async()=>{
      render(<App/>)
      await waitFor(()=>{ 
      const editButton=screen.getByTestId('edit-button-1');
      expect(editButton).toBeInTheDocument();
      fireEvent.click(editButton);
    })
       
      await waitFor(()=>{
      const cancelButton=screen.getByTestId('cancel-button');
      expect(cancelButton).toBeInTheDocument();
      fireEvent.click(cancelButton);
       })
      
        const row=screen.getByTestId('row-1')
        expect(row).toHaveTextContent('Sana');
        expect(row).toHaveTextContent('Sana'); 
        expect(row).toHaveTextContent('Sana@example.com'); 
        expect(row).toHaveTextContent('987'); 
        expect(row).toHaveTextContent('Punjab');  
     
    })

});





