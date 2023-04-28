import React from 'react';

// React Icon
import { FaFacebook, FaWhatsapp } from 'react-icons/fa';
import { AiOutlineInstagram } from 'react-icons/ai';
import { RiFacebookCircleLine } from 'react-icons/ri';


// Component
import ContactUsItem from './ContactUsItem';

const ContactUs = () => {
  return (
    <section className='d-flex justify-content-around gap-4 mb-5'>

        <ContactUsItem
            icon={<RiFacebookCircleLine className='display-3 me-2' />} 
            title='Visitanos en' 
            appName='FACEBOOK' 
            link='https://www.google.com/'
        />

        <ContactUsItem
            icon={<AiOutlineInstagram className='display-3 me-2' />} 
            title='Visitanos en' 
            appName='INSTAGRAM' 
            link='https://www.google.com/'
        />

        <ContactUsItem
            icon={<FaWhatsapp className='display-3 me-2' />} 
            title='Visitanos en' 
            appName='WHATSAPP' 
            link='HHH'
        />
        
    </section>
  );
}

export default ContactUs
