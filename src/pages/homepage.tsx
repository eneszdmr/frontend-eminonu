import { Card, CardContent, Box, Grid, Typography } from "@mui/material";
import axios from "axios";
import { Chart } from 'primereact/chart';
import { useEffect, useState } from "react";



const createAxiosInstance = () => {
    console.log("API URL:", import.meta.env.VITE_API_URL);
    const token = localStorage.getItem("token");
    return axios.create({
        baseURL: import.meta.env.VITE_API_URL,
        headers: {
            "Content-Type": "application/json",
            "Authorization": token ? `Bearer ${token}` : "",
        },
    });
};

const HomePage = () => {
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});
    const [clickChartData, setClickChartData] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const axiosInstance = createAxiosInstance();

                // Toplam sayılar
                const countRes = await axiosInstance.get(`counts`);
                const countData = countRes.data;
                const data = {
                    labels: ['Firmalar', 'Kategoriler', 'Yorumlar', 'Ürünler'],
                    datasets: [
                        {
                            label: 'Toplam Adet',
                            data: countData,
                            backgroundColor: [
                                'rgba(255, 159, 64, 0.2)',
                                'rgba(75, 192, 192, 0.2)',
                                'rgba(54, 162, 235, 0.2)',
                                'rgba(153, 102, 255, 0.2)'
                            ],
                            borderColor: [
                                'rgb(255, 159, 64)',
                                'rgb(75, 192, 192)',
                                'rgb(54, 162, 235)',
                                'rgb(153, 102, 255)'
                            ],
                            borderWidth: 1
                        }
                    ]
                };
                setChartData(data);

                // En çok tıklanan 5 firma
                const clickRes = await axiosInstance.get(`top-clicked-companies`);
                const clickCompanies = clickRes.data;

                const clickData = {
                    labels: clickCompanies.map((c: any) => c.name),
                    datasets: [
                        {
                            label: 'Tıklanma Sayısı',
                            data: clickCompanies.map((c: any) => c.clickCount),
                            backgroundColor: 'rgba(255, 99, 132, 0.2)',
                            borderColor: 'rgb(255, 99, 132)',
                            borderWidth: 1
                        }
                    ]
                };
                setClickChartData(clickData);

            } catch (error) {
                console.error("Veri çekme hatası:", error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        setChartOptions({
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        });
    }, []);

    return (
        <Box sx={{ flexGrow: 1, p: 4 }}>
            <Grid container spacing={4} justifyContent="center">
                <Grid item xs={12} md={5}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>Genel Sayılar</Typography>
                            <Chart type="bar" data={chartData} options={chartOptions} />
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} md={5}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>En Çok Tıklanan 5 Firma</Typography>
                            <Chart type="bar" data={clickChartData} options={chartOptions} />
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
};

export default HomePage;
