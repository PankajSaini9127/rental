import React from 'react'
import HamburgerMenu from '../HamburgerMenu'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function HamburgerAdmin() {

    const {
        auth: { role },
      } = useSelector((s) => s);

      const navigate = useNavigate()

  return (
    <HamburgerMenu
          navigateHome={
            role.includes("Manager")
              ? "dashboard"
              : role.includes("Operations")
              ? "operationsDashboard"
              : role.includes("Admin") && "userDashboard"
          }
          admin={[
            { text: "All User", navigateTo: "/userManagement/all-user" }
          ]
          }
        />
  )
}

export default HamburgerAdmin
