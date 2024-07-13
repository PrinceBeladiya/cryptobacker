import React from 'react'

const CampaignList = () => {
    const [isLoading, setIsLoading] = useState(false);
    //const [campaigns, setCampaigns] = useState([]);
  
    // const { address, contract, getCampaigns } = useStateContext();

    const campaigns = [
        {
          id: 1,
          owner: "Alice",
          title: "Help Build a School",
          description: "We need funds to build a new school in our community.",
          target: "5000 USD",
          deadline: "2024-12-31",
          amountCollected: "1200 USD",
          image: "https://via.placeholder.com/150"
        },
        {
          id: 2,
          owner: "Bob",
          title: "Medical Aid for John",
          description: "John needs urgent medical treatment.",
          target: "10000 USD",
          deadline: "2024-11-30",
          amountCollected: "3000 USD",
          image: "https://via.placeholder.com/150"
        },
        {
          id: 3,
          owner: "Charlie",
          title: "Community Park Renovation",
          description: "We aim to renovate the old community park.",
          target: "8000 USD",
          deadline: "2024-09-15",
          amountCollected: "5000 USD",
          image: "https://via.placeholder.com/150"
        },
        {
          id: 4,
          owner: "David",
          title: "Support Local Artists",
          description: "Funds for organizing an exhibition for local artists.",
          target: "3000 USD",
          deadline: "2024-10-10",
          amountCollected: "2000 USD",
          image: "https://via.placeholder.com/150"
        },
        {
          id: 5,
          owner: "Eve",
          title: "Food Drive for Homeless",
          description: "Organizing a food drive for the homeless.",
          target: "2000 USD",
          deadline: "2024-08-20",
          amountCollected: "1000 USD",
          image: "https://via.placeholder.com/150"
        },
        {
          id: 6,
          owner: "Frank",
          title: "Animal Shelter",
          description: "Raising funds to build a new animal shelter.",
          target: "7000 USD",
          deadline: "2024-12-05",
          amountCollected: "2500 USD",
          image: "https://via.placeholder.com/150"
        },
        {
          id: 7,
          owner: "Grace",
          title: "Library Expansion",
          description: "We need funds to expand our local library.",
          target: "6000 USD",
          deadline: "2024-11-25",
          amountCollected: "3500 USD",
          image: "https://via.placeholder.com/150"
        },
        {
          id: 8,
          owner: "Hannah",
          title: "New Playground Equipment",
          description: "Funds for new equipment in the children's playground.",
          target: "4000 USD",
          deadline: "2024-09-30",
          amountCollected: "1800 USD",
          image: "https://via.placeholder.com/150"
        },
        {
          id: 9,
          owner: "Ivy",
          title: "Clean Water Project",
          description: "Providing clean water to remote villages.",
          target: "10000 USD",
          deadline: "2024-10-20",
          amountCollected: "6200 USD",
          image: "https://via.placeholder.com/150"
        },
        {
          id: 10,
          owner: "Jack",
          title: "Youth Sports Program",
          description: "Supporting a sports program for underprivileged youth.",
          target: "5000 USD",
          deadline: "2024-08-15",
          amountCollected: "3000 USD",
          image: "https://via.placeholder.com/150"
        }
      ];
  
    // const fetchCampaigns = async () => {
    //   setIsLoading(true);
    //   const data = await getCampaigns();
    //   setCampaigns(data);
    //   setIsLoading(false);
    // }
  
    // useEffect(() => {
    //   if(contract) fetchCampaigns();
    // }, [address, contract]);
  
    return (
      <DisplayCampaigns 
        title="All Campaigns"
        isLoading={isLoading}
        campaigns={campaigns}
      />
    )
}

export default CampaignList
