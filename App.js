import { useRef } from "react";
import { useState } from "react";
import './App.css'

function App() {
    const [isEdit, setIsEdit] = useState(null)
    const [addVisible, setAddVisible] = useState(false)
    const formfirstNameRef=useRef()
    const formlastNameRef=useRef()
    const formemailNameRef=useRef()
    const formcontactRef=useRef()
    const formaddressRef=useRef()



    const firstNameRef = useRef();
    const lastNameRef = useRef();
    const emailRef = useRef();
    const contactRef = useRef();
    const addressRef = useRef();


    const [userInfo, setUserInfo] = useState([
        {
            id: 1,
            firstName: 'Sana',
            lastName: 'Sana',
            email: 'Sana@example.com',
            contact: 987,
            address: 'Punjab'
        },
        {
            id: 2,
            firstName: 'Aman',
            lastName: 'Sharma',
            email: 'Sharma@example.com',
            contact: 987,
            address: 'Panchkula'
        }
    ])

    function onEdit(id) {
        setIsEdit(id);
    }

    function onDelete(id) {
        const newUpdateddata = userInfo.filter((user) => user.id !==id)
        setUserInfo(newUpdateddata);
    }
    function onCancel() {
        setIsEdit(null);
    }
    function onSave(id) {
        const userdata = userInfo.map((user) => {
            if (user.id === id) {
                user.firstName = firstNameRef.current.value
                user.lastName = lastNameRef.current.value
                user.email = emailRef.current.value
                user.address = addressRef.current.value
                user.contact = contactRef.current.value
                return user;
            }
            return user;
        })
        setUserInfo(userdata);
        setIsEdit(null);
    }

    const handleInput = (evt) => {
        evt.preventDefault()
        // console.log(evt)
          
            const firstName= formfirstNameRef.current.value;
            const lastName= formlastNameRef.current.value;
            const email= formemailNameRef.current.value;
            const contact= formaddressRef.current.value;
            const address= formcontactRef.current.value;

            // if (!firstName||!lastName|| !email||!contact||!address){
            //     alert("all input fileds are required")
            //     return
            // }
            const userData={
                id:userInfo.length+1,
                firstName,
                lastName,
                email,
                address,
                contact
            }
        

        const newUpdateddata = [...userInfo, userData]
        setUserInfo(newUpdateddata) 
        
         formfirstNameRef.current.value = '';
         formlastNameRef.current.value = '';
         formemailNameRef.current.value = '';
         formaddressRef.current.value = '';
         formcontactRef.current.value = ''
         setAddVisible(false)
         setIsEdit(null)
         
             
    }

    return (
        <div className='App'>
          
            <button style={addVisible ?{display:"none"}:{display:"block"}}
             onClick={()=>setAddVisible(true)} data-testid="addUser-button">AddUser</button>
             <form  style={addVisible ?{display:"block"}:{display:"none"}}
              onSubmit={handleInput}
              data-testid="user-form">  

            <input type="text" name='firstName' placeholder='firstName' ref={formfirstNameRef} data-testid="firstName-input"/>
            <input type="text" name='lastName' placeholder='lastName'ref={formlastNameRef} data-testid="lastName-input"/>
            <input type="text" name='email'   placeholder='email' ref={formemailNameRef} data-testid="email-input"/>
            <input type="text" name='address' placeholder='address'ref={formaddressRef} data-testid="address-input" />
            <input type="text" name='contact' placeholder='contact'ref={formcontactRef}data-testid="contact-input" />
            <button  data-testid="submit-button">Submit</button>
            </form>

            <table>
                <tbody>
                    <tr>
                        <th>FirstName</th>
                        <th>LastName</th>
                        <th>Email</th>
                        <th>Contact</th>
                        <th>Address</th>
                    </tr>
                     
                    {userInfo.map((item, index) => {
                        if (isEdit === item.id) {
                            return (
                                <tr key={index}  data-testid={`row-${item.id}`}>
                                    <td>
                                        <input type="text"
                                            name='firstName'
                                            ref={firstNameRef}
                                            defaultValue={item.firstName}
                                            data-testid="edit-firstName" 
                                              
                                        />
                                    </td>
                                    <td>
                                        <input type="text"
                                            name='lastName'
                                            ref={lastNameRef}
                                            defaultValue={item.lastName}
                                            data-testid="edit-lastName" />
                                    </td>
                                    <td>
                                        <input type="text"
                                            name='email'
                                            ref={emailRef}
                                            defaultValue={item.email}
                                            data-testid="edit-email" />
                                    </td>
                                    <td>
                                        <input type="text"
                                            name='contact'
                                            ref={contactRef}
                                            defaultValue={item.contact}
                                            data-testid="edit-contact" />
                                    </td>
                                    <td>
                                        <input type="text"
                                            name='address'
                                            ref={addressRef}
                                            defaultValue={item.address} 
                                            data-testid="edit-address"/>
                                    </td>

                                    <td>
                                        <button onClick={() => onSave(item.id)}data-testid='save-button'> Save</button>
                                        <button onClick={() => onCancel(item.id)} data-testid='cancel-button'>cancel</button>
                                    </td>
                                </tr>
                            )
                        }

                        return (
                            <tr key={index} data-testid={`row-${item.id}`}>
                                <td>{item.firstName}</td>
                                <td>{item.lastName}</td>
                                <td>{item.email}</td>
                                <td>{item.contact}</td>
                                <td>{item.address}</td>
                                <td>
                                    <button onClick={() => onEdit(item.id)}data-testid={`edit-button-${item.id}`}>Edit</button>
                                    <button onClick={() => onDelete(item.id)}data-testid={`delete-button-${item.id}`}>Delete</button>
                                </td>
                            </tr>
                        )

                    })}

              </tbody>
            </table>
        </div>

    );
}

export default App;





          