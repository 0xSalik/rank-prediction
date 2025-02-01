# Probabilistic Prediction Model for NEET Rank Determination

## Overview

This is a computational framework engineered to provide high-fidelity rank predictions based on advanced probabilistic modeling, historical performance trends, and real-time adaptive analysis. By leveraging statistical inference, Bayesian probability networks, and dynamically weighted scoring mechanisms, the system ensures a robust and accurate prediction of expected NEET rankings.

In addition to rank estimation, the system features an integrated **Performance Analysis Module** that diagnoses scoring consistency, identifies improvement trends, and provides actionable insights. The application also includes a **College Admission Predictor**, which matches candidates to potential institutions based on dynamic eligibility factors and multivariate ranking heuristics.

A modern **UI dashboard** allows users to visualize trends, track their predictive ranking over time, and access detailed performance analytics.

## Key Features

- **Probabilistic Rank Estimation** – Implements Bayesian inference to refine prediction accuracy based on empirical data.
- **Dynamic Weighted Scoring Model** – Utilizes exponentially decaying weight functions to prioritize recent performance while considering historical trends.
- **Statistical Consistency Calibration** – Incorporates mean deviation, variance analysis, and real-time corrections.
- **Multi-Factor Predictive Modeling** – Employs difficulty adjustments, scoring gradients, and error minimization heuristics.
- **College Admission Forecasting** – Uses hierarchical selection algorithms and multivariate eligibility comparisons.
- **Interactive UI Dashboard** – Provides real-time performance tracking and predictive insights through a clean and intuitive interface.

## Approach & Algorithm

### 1. Dynamic Weighted Accuracy Model

A multi-layered algorithm dynamically assigns scoring weights using:

- **Quadratic Weighting Functions** – Ensures an optimal balance between past and recent performances.
- **Bayesian Inference Mechanisms** – Reduces fluctuations and enhances probabilistic accuracy.
- **Error-Minimized Rank Scaling** – Implements real-time corrections based on standard deviation scoring.

### 2. Statistical Consistency Calibration

A robust statistical model fine-tunes predictions by analyzing:

- **Mean and Standard Deviation of Historical Scores** – Captures trend variations and adapts scoring scales accordingly.
- **Sigmoid Transformation for Normalization** – Converts raw performance deviations into stable, interpretable outputs.
- **Performance Tier Adaptive Scaling** – Dynamically adjusts to different skill tiers for precision forecasting.

### 3. Multi-Factor Rank Estimation

The final rank prediction integrates:

- **Absolute Score Metrics** – Utilizes high-resolution normalization mapping functions.
- **Test Difficulty Adjustment** – Calibrates rankings based on contextual difficulty weights.
- **Performance Gradient Analysis** – Tracks and adapts to long-term improvement patterns.

### 4. College Admission Prediction

A predictive modeling framework for estimating college admissions, utilizing:

- **Hierarchical Sorting Algorithms** – Prioritizes institution eligibility based on dynamic scoring factors.
- **Multivariate Rank Analysis** – Benchmarks rank eligibility across multiple academic tiers.
- **Optimized Selection Heuristics** – Employs probability-driven heuristics for maximized admission success rates.

## API Endpoints

### Rank Prediction

- `GET /api/rank` – Submits performance data and returns a probabilistic rank and college estimation.

### Performance Analysis

- `GET /api/performance` – Runs performance diagnostics and provides analytical insights.

### Performance Trends

- `GET /api/trends` – Provides visualization trends to be mapped onto graphs or charts.

## Setup and Installation

### Prerequisites

Ensure the following dependencies are installed:

- **Node.js** (v20+)
- **Bun** (v1.0+)

### Installation Steps

1.  **Clone the Repository**

    ```sh
    git clone https://github.com/0xSalik/rank-prediction.git
    cd rank-prediction
    ```

2.  **Install Dependencies**

    ```sh
    bun install
    ```

3.  **Setup Environment Variables** Create a `.env` file and configure the required database and API settings:

    ```env
    NEXT_PUBLIC_LAST_QUIZ_DATA=
    NEXT_PUBLIC_LAST_QUIZ_OVERVIEW=
    NEXT_PUBLIC_PREVIOUS_QUIZ_ATTEMPTS=
    ```

4.  **Start the Application**

    ```sh
    bun dev
    ```

    Access the UI at **[http://localhost:3000](http://localhost:3000/)**.

## UI Screenshots

![SS1](https://i.imgur.com/EeALvxC.png)
![SS2](https://i.imgur.com/B3wQBlu.png)
![SS3](https://i.imgur.com/7wAIn9f.png)
![SS4](https://i.imgur.com/dCSsAmS.png)
