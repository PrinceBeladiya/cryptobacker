  import CreateCampaign from "./CreateCampaign"
  import { useState } from "react";
  import { isAlphabets,isdescreption,isFutureDate } from "../../utils";
  import toast from "react-hot-toast";
  const CreateCampaignContainer = () => {

    const [formData, setFormData] = useState({
      title: '',
      target: '',
      description: '',
      select_category: 'NA',
      deadline: '',
      campaingn_thumbnil: undefined,
      campaingn_report: undefined,
    });

    const handleSubmit = (e) => {
      e.preventDefault();
      if(formData.title.length > 0 && formData.description.trim().length > 0 && formData.select_category !='NA'){
        if(isAlphabets(formData.title) && Number(formData.target) > 0 && isdescreption(formData.description) && isFutureDate(formData.deadline)){
          toast.success('Data Submitted','success');

          // ********** add your logic here *************

        }
        else{
          toast.error('Please Fill Valid Deatils','warn')
        }
      }
      else{
        toast.error('Please Fill all Details')
      }
    }

    const handlechange = (e) => {
      const { name, value, type, files } = e.target;
    
      if (type === 'file') {
        setFormData(prevState => ({
          ...prevState,
          [name]: files[0],
        }));
      } else {
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