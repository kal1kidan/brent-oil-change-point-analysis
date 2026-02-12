# src/change_point_model.py
import pymc as pm
import numpy as np

def simple_bayesian_change_point(log_returns):
    with pm.Model() as model:
        tau = pm.DiscreteUniform('tau', lower=0, upper=len(log_returns)-1)
        mu1 = pm.Normal('mu1', mu=log_returns.mean(), sigma=0.01)
        mu2 = pm.Normal('mu2', mu=log_returns.mean(), sigma=0.01)
        sigma = pm.HalfNormal('sigma', sigma=0.01)
        mu = pm.math.switch(tau >= np.arange(len(log_returns)), mu1, mu2)
        obs = pm.Normal('obs', mu=mu, sigma=sigma, observed=log_returns)
        trace = pm.sample(1000, tune=500, target_accept=0.9)
    return trace
