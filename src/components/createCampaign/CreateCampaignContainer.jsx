  import CreateCampaign from "./CreateCampaign"
  import { useState } from "react";
  const CreateCampaignContainer = () => {

    const [formData, setFormData] = useState({
      title: '',
      target: '',
      description: '',
      select_category: 'NA',
      post_date: '',
      campaingn_thumbnil: null,
      campaingn_report: null,
    });

    const handleSubmit = (e) => {
      e.preventDefault();
      console.log(formData);
        
    }

    const handlechange = (e) => {
      const { name, value, type, files } = e.target;
    
      if (type === 'file') {
        // For file inputs
        setFormData(prevState => ({
          ...prevState,
          [name]: files[0], // Handle file input change
        }));
      } else {
        // For text, number, date, and select inputs
        setFormData(prevState => ({
          ...prevState,
          [name]: value,
        }));
      }
    };
    

    return (
      <CreateCampaign
      handleSubmit={handleSubmit}
      handlechange={handlechange}
      />
    )
  }

  export default CreateCampaignContainer