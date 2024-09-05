import { useEffect, useRef, useState } from 'react';
import UserDashboard from './UserDashboard'
import ApexCharts from 'apexcharts';
import { getUserCampaigns } from '../../context';

const UserDashBoardContainer = () => {
  const chartRef = useRef(null);
  const [userCampaigns, setUserCampaigns] = useState([]);

  const getUserCampaignDetails = () => {
    getUserCampaigns().then((res) => {
      setUserCampaigns(res);
    });
  }

  useEffect(() => {
    getUserCampaignDetails();
  }, []);

  const [isOpen, setIsOpen] = useState(false);
  const [categories, setCategories] = useState([
    { id: 'apple', name: 'Apple', count: 56, checked: false },
    { id: 'fitbit', name: 'Fitbit', count: 56, checked: false },
    { id: 'dell', name: 'Dell', count: 56, checked: false },
    { id: 'asus', name: 'Asus', count: 97, checked: false },
    { id: 'logitech', name: 'Logitech', count: 97, checked: false },
    { id: 'msi', name: 'MSI', count: 97, checked: false },
    { id: 'bosch', name: 'Bosch', count: 176, checked: false },
    { id: 'sony', name: 'Sony', count: 234, checked: false },
    { id: 'samsung', name: 'Samsung', count: 76, checked: false },
    { id: 'canon', name: 'Canon', count: 49, checked: false },
    { id: 'microsoft', name: 'Microsoft', count: 45, checked: false },
    { id: 'razor', name: 'Razor', count: 49, checked: false },
  ]);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleCheckboxChange = (id) => {
    setCategories(categories.map(category =>
      category.id === id ? { ...category, checked: !category.checked } : category
    ));
  };


  const handleclick = () => {
    // go to campaign details page for user owning the campaign
  }

  useEffect(() => {
    const options = {
      chart: {
        height: 420,
        type: 'area',
        fontFamily: 'Inter, sans-serif',
        foreColor: '#6B7280',
        toolbar: {
          show: false
        },
      },
      fill: {
        type: 'gradient',
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.7,
          opacityTo: 0.9,
          stops: [0, 90, 100]
        }
      },
      dataLabels: {
        enabled: false
      },
      tooltip: {
        style: {
          fontSize: '14px',
          fontFamily: 'Inter, sans-serif'
        },
      },
      grid: {
        show: true,
        borderColor: '#F3F4F6',
        strokeDashArray: 1,
        padding: {
          left: 35,
          bottom: 15
        }
      },
      series: [
        {
          name: 'Revenue',
          data: [6356, 6218, 6156, 6526, 6356, 6256, 6056],
          color: '#1A56DB'
        },
        {
          name: 'Revenue (previous period)',
          data: [6556, 6725, 6424, 6356, 6586, 6756, 6616],
          color: '#FDBA8C'
        }
      ],
      markers: {
        size: 5,
        strokeColors: '#ffffff',
        hover: {
          size: 7
        }
      },
      xaxis: {
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        },
        labels: {
          style: {
            colors: '#6B7280',
            fontSize: '14px',
            fontWeight: 500
          }
        },
        categories: ['01 Feb', '02 Feb', '03 Feb', '04 Feb', '05 Feb', '06 Feb', '07 Feb'],
        type: 'datetime'
      },
      yaxis: {
        labels: {
          style: {
            colors: '#6B7280',
            fontSize: '14px',
            fontWeight: 500
          },
          formatter: function (value) {
            return '$' + value;
          }
        },
      },
      legend: {
        fontSize: '14px',
        fontWeight: 500,
        fontFamily: 'Inter, sans-serif',
        labels: {
          colors: '#6B7280'
        },
        itemMargin: {
          horizontal: 10
        }
      },
      responsive: [
        {
          breakpoint: 1024,
          options: {
            xaxis: {
              labels: {
                show: false
              }
            }
          }
        }
      ]
    };

    if (chartRef.current && typeof ApexCharts !== 'undefined') {
      const chart = new ApexCharts(chartRef.current, options);
      chart.render();

      return () => {
        chart.destroy();
      };
    }
  }, []);
  return (
    <UserDashboard
      chartRef={chartRef}
      userCampaigns={userCampaigns}
      handleclick={handleclick}
      toggleDropdown={toggleDropdown}
      isOpen={isOpen}
      categories={categories}
      handleCheckboxChange={handleCheckboxChange}
    />
  )
}

export default UserDashBoardContainer
