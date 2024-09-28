import { useEffect, useRef, useState, useCallback } from 'react';
import UserDashboard from './UserDashboard';
import ApexCharts from 'apexcharts';
import { getUserCampaigns, getUserDonations } from '../../context';
import { useSelector } from 'react-redux';

const UserDashBoardContainer = () => {
  const chartRef = useRef(null);
  const [userCampaigns, setUserCampaigns] = useState([]);
  const [currentWeekDonation, setCurrentWeekDonation] = useState(0);
  const [growth, setGrowth] = useState(0);
  const [chartData, setChartData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const { userStatus } = useSelector((state) => state.user);

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
  };

  const parseDate = (timestamp) => new Date(timestamp);

  const getStartOfWeek = (date) => {
    const startOfWeek = new Date(date);
    startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
    startOfWeek.setHours(0, 0, 0, 0); // Start of the day
    return startOfWeek;
  };

  const getEndOfWeek = (date) => {
    const endOfWeek = new Date(date);
    endOfWeek.setDate(endOfWeek.getDate() + (6 - endOfWeek.getDay()));
    endOfWeek.setHours(23, 59, 59, 999); // End of the day
    return endOfWeek;
  };

  const filterDonationsByWeek = (donations, startDate, endDate) => {
    return donations.filter(donation => {
      const donationDate = parseDate(donation.timestamp);
      return donationDate >= startDate && donationDate <= endDate;
    });
  };

  const calculateGrowthLoss = (currentWeekTotal, previousWeekTotal) => {
    if (previousWeekTotal === 0) {
      return currentWeekTotal > 0 ? 100 : 0; // Handle zero previous week total
    }
    return ((currentWeekTotal - previousWeekTotal) / previousWeekTotal) * 100;
  };

  const processUserDonations = useCallback((donations) => {
    const now = new Date();
    const startOfWeek = getStartOfWeek(now);
    const endOfWeek = getEndOfWeek(now);
    const startOfLastWeek = new Date(startOfWeek);
    startOfLastWeek.setDate(startOfWeek.getDate() - 7);
    const endOfLastWeek = new Date(endOfWeek);
    endOfLastWeek.setDate(endOfWeek.getDate() - 7);

    const currentWeekDonations = filterDonationsByWeek(donations, startOfWeek, endOfWeek)
      .reduce((total, donation) => total + parseFloat(Number(donation.amountETH) / 10 ** 18), 0);

    const previousWeekDonations = filterDonationsByWeek(donations, startOfLastWeek, endOfLastWeek)
      .reduce((total, donation) => total + parseFloat(Number(donation.amountETH) / 10 ** 18), 0);

    const growthLoss = calculateGrowthLoss(currentWeekDonations, previousWeekDonations);

    const donationDataByDate = donations.reduce((acc, donation) => {
      const timestamp = new Date(donation.timestamp);
      timestamp.setDate(timestamp.getDate() + 1); // Add one day
      const date = timestamp.toLocaleDateString('en-US'); // Format date (MM/DD/YYYY)
      const amountETH = parseFloat(Number(donation.amountETH) / 10 ** 18); // Convert ETH from wei

      if (!acc[date]) {
        acc[date] = 0; // Initialize if the date doesn't exist
      }
      acc[date] += amountETH; // Sum the donations by date

      return acc;
    }, {});

    const categories = Object.keys(donationDataByDate); // Dates with one day ahead
    const seriesData = Object.values(donationDataByDate); // Summed donations

    return {
      categories,
      seriesData,
      currentWeekDonations,
      growthLoss
    };
  }, []);

  const getUserCampaignDetails = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const campaignsRes = await getUserCampaigns();
      setUserCampaigns(campaignsRes);

      const donationsRes = await getUserDonations();
      const processedData = processUserDonations(donationsRes);
      
      setCurrentWeekDonation(processedData.currentWeekDonations);
      setGrowth(processedData.growthLoss.toFixed(2));
      setChartData(processedData);
    } catch (error) {
      console.error("Error fetching user data:", error);
      setError("Failed to fetch user data. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  }, [processUserDonations]);

  useEffect(() => {
    getUserCampaignDetails();
  }, [getUserCampaignDetails]);

  useEffect(() => {
    if (chartData && chartRef.current && typeof ApexCharts !== 'undefined') {
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
            name: 'Donations in ETH',
            data: chartData.seriesData,
            color: '#1A56DB'
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
          categories: chartData.categories,
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
              return value.toFixed(2) + ' ETH';
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

      if (chartRef.current.chartInstance) {
        chartRef.current.chartInstance.destroy();
      }

      chartRef.current.chartInstance = new ApexCharts(chartRef.current, options);
      chartRef.current.chartInstance.render();

      return () => {
        if (chartRef.current && chartRef.current.chartInstance) {
          chartRef.current.chartInstance.destroy();
        }
      };
    }
  }, [chartData]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <UserDashboard
      chartRef={chartRef}
      userCampaigns={userCampaigns}
      handleclick={handleclick}
      toggleDropdown={toggleDropdown}
      isOpen={isOpen}
      categories={categories}
      handleCheckboxChange={handleCheckboxChange}
      currentWeekDonation={currentWeekDonation}
      growth={growth}
      userStatus={userStatus}
    />
  );
};

export default UserDashBoardContainer;