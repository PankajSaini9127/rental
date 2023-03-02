import React from 'react'
import LoginComponent from '../StyleComponents/LoginComponent';

function RentalLogin() {

    const data = { username: "bitwit", password: "Bitwit" };
  return (
    <>
     <LoginComponent
        title="Login"
        subTitle={'Rental Portal'}
        data={data}
        nevigate={"dashboard"}
      />
    </>
  )
}

export default RentalLogin