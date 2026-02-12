# src/data_utils.py
import pandas as pd
import numpy as np

def load_brent_data(file_path):
    """
    Load and clean Brent oil prices dataset.
    """
    df = pd.read_csv(file_path)
    df['Date'] = pd.to_datetime(df['Date'])
    df.sort_values('Date', inplace=True)
    df.reset_index(drop=True, inplace=True)
    return df

def compute_log_returns(df, price_col='Price'):
    """
    Compute log returns of Brent oil prices for stationarity.
    """
    df['Log_Return'] = np.log(df[price_col] / df[price_col].shift(1))
    df.dropna(inplace=True)
    return df
