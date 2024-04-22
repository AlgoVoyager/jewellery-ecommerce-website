import React, { useEffect, useState } from 'react';
import Nav from '../Components/Nav';
import Footer from '../Components/Footer';
import Pitem from '../Components/Pitem';

const orderForm = () => {
  const [orders, setorders] = useState([])
  const [fname, setfname] = useState("User")
  const getorders = async (e) => {
    // e.preventDefault()

		const response = await fetch('http://localhost:3000/api/order/allorders', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({user:JSON.parse(atob(localStorage.getItem("token").split(".")[1])).email}),
		})

		const data = await response.json()
        const ordersarray = []
        ordersarray.push((data.info).map((item)=>item))
        setorders([])
        setTimeout(() => {
            setorders(ordersarray[0])
            
        }, 400);
        console.log(orders)
		// if (data.status === 'ok') {
        //  setinfoMsg(data.infoMsg)
        //  resetForm()
		// }else{
        //     setinfoMsg(data.infoMsg)
        // }
  };
  const getUser = async ()=>{
        const response = await fetch('http://localhost:3000/api/user/udetails', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({user:JSON.parse(atob(localStorage.getItem("token").split(".")[1])).email}),
        })
        const data = await response.json()

        if (data.status === 'ok') {
            setfname(data.info[0].fullname)
        }else{
            console.log("error finding merchant details")

        }
    }
  useEffect(()=>{ 
    getUser();
  },[])
  useEffect(()=>{
    getorders()
  },[])
  return (
    <div className="">
        <Nav /> 
        <div className='bg-orange-50 w-2/3 p-10 rounded-xl mx-auto mt-5 flex flex-col'>
            <div className='flex justify-between p-5'>
                <h1>Welcome, <span className='text-xl font-bold'>{fname}</span> </h1>           
                <button onClick={getorders} className='rounded-xl p-2 hover:bg-orange-200 bg-orange-100'>Refresh all Orders</button>

            </div>
            <div className='bg-white flex justify-evenly flex-wrap gap-5 p-5'>
            <table cellPadding={15} cellSpacing={5}>
                <tr className='bg-orange-100 '>

                    <th>Products</th>
                    <th>Status</th>
                    <th>Shipping Address</th>
                    <th>Total Amount</th>
                    <th>Order Date</th>
                </tr>
                {orders.length===0&&<tr>No Orders Placed</tr>}
            {orders.map((item)=>(
                <tr className='bg-orange-50'>
            <td className='font-semibold'>{(item.products).map((p)=><span className='block'>{p}</span>)}</td>
            <td className='font-semibold'>{item.status}</td>
            <td className='font-semibold'>{item.shippingAddress}</td>
            <td className='font-semibold'>₹{item.totalAmount}</td>
            <td className='font-semibold'>{item.orderDate}</td>
                    
                </tr>
        ))}
            </table>
                 <div className='p-2 rounded w-fit hover:shadow-xl shadow-md bg-orange-50'>
                    {/* <button className='text-sm p-1 rounded-md bg-orange-100 hover:bg-orange-200 text-center block w-full'>See Order Report</button> */}
                 </div>
            </div>
        </div>
        
        <Footer />

    </div>
    
  );
};

export default orderForm;
