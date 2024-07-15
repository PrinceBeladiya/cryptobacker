import React, { useEffect,useState } from 'react'
import DisplayCampaigns from '../componets/DisplayCampaigns'
import Navbar from '../componets/Navbar';
import { getCampaigns } from '../context';

const HomePage = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [campaigns, setCampaigns] = useState([]);

    async function isConnected() {
      if (typeof window.ethereum !== 'undefined') {
        const isLocked = !(await window.ethereum._metamask.isUnlocked())
        if (!isLocked) {
          console.log("MetaMask is unlocked")
          return true
        } else {
          console.log("MetaMask is locked")
          try {
            // Request account access if MetaMask is locked
            await window.ethereum.request({ method: 'eth_requestAccounts' })
            return true
          } catch (err) {
            console.log("User denied account access")
            return false
          }
        }
      } else {
        console.log("MetaMask is not installed")
        return false
      }
    }
  
    async function getalldata() {
      setIsLoading(true)
      if (await isConnected()) {
        try {
          const data = await getCampaigns()
          setCampaigns(data)
        } catch (err) {
          console.log("There is an error.")
          console.log("Error - ", err)
        }
      }
      setIsLoading(false)
    }
  
    useEffect(() => {
      getalldata()
    }, [])

    return (
      <>
      {campaigns && campaigns.length > 0 && (
          <>
            <Navbar/>
            <DisplayCampaigns 
              title="All Campaigns"
              isLoading={isLoading}
              campaigns={campaigns}
            />
          </>
      )}
      </>
    )
}

export default HomePage
