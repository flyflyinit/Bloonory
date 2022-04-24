'use strict';
const express = require('express');




//const {dashboard, pieChart, dailyData} = require('../controllers/dashboardController');
const axios = require('axios');
 
const url = 'https://covid19.mathdro.id/api';
const dashboard = (req, res, next) => {
    res.render('pages/dashboard');
}

const pieChart = async (req, res, next) => {
    try {
        const fecthData = await axios.get(url);
        res.status(200).json(fecthData.data);
    } catch (error) {
        res.status(400).send(error.message);
    }
}
const dailyData = async (req, res, next) => {
    try {
        const fetchData = await axios.get(`${url}/daily`);
        res.status(200).json(fetchData.data);
    } catch (error) {
        res.status(400).send(error.message);
    }
}








const router = express.Router();

router.get('/', dashboard);
router.get('/piechartData', pieChart);
router.get('/dailyData', dailyData);

module.exports = {
    routes: router
}