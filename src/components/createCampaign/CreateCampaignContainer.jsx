import CreateCampaign from "./CreateCampaign"
import { useState } from "react";
import { isAlphabets, isdescreption, isFutureDate } from "../../utils";
import toast from "react-hot-toast";
import { createCampaign, getCampaigns } from "../../context";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const CreateCampaignContainer = () => {
  const { userName, userStatus } = useSelector((state) => state.user);

  const [isLoading, setisLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    target: '',
    description: '',
    category: 'NA',
    deadline: '',
    campaingn_thumbnail: undefined,
    campaingn_report: undefined,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

      if (formData.title.length > 0 && formData.description.trim().length > 0 && formData.select_category != 'NA') {
        if (Number(formData.target) > 0 && isFutureDate(formData.deadline)) {
          setisLoading(true);
          formData['name'] = userName;

          await createCampaign(formData);
          setisLoading(false);
          const data = await getCampaigns();
          if(data){
            navigate('/campaign-list')
          }
        }
        else {
          setisLoading(false);
          toast.error('Please Fill Valid Deatils', 'warn')
        }
      }
      else {
        setisLoading(false);
        toast.error('Please Fill all Details')
      }
    } catch(err) {
      console.log(err);
      setisLoading(false);
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
      isLoading={isLoading}
      userStatus={userStatus}
      containerVariants={containerVariants}
      itemVariants={itemVariants}
    />
  )
}

export default CreateCampaignContainer