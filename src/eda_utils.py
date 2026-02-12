# src/eda_utils.py
import matplotlib.pyplot as plt

def plot_time_series(df, col='Price', title=''):
    plt.figure(figsize=(12,5))
    plt.plot(df['Date'], df[col])
    plt.title(title)
    plt.xlabel('Date')
    plt.ylabel(col)
    plt.show()
