'use client';

import React, { useState } from 'react';
import { ArrowRight, Terminal, Brain, Zap, ChevronDown } from 'lucide-react';

export default function Home() {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [twitterHandle, setTwitterHandle] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    if (!email && !phone && !twitterHandle) {
      setError('Please enter at least one field');
      return;
    }

    try {
      const supabaseUrl = 'https://ewcqmsfaostcwmgybbub.supabase.co';
      const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV3Y3Ftc2Zhb3N0Y3dtZ3liYnViIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE5MDc2NzgsImV4cCI6MjA2NzQ4MzY3OH0.fTisTg3jBy2WSuuIkvWToZ8c3R133QJ5FL0o0Q7c4MU';

      const response = await fetch(`${supabaseUrl}/rest/v1/waitlist`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': supabaseKey,
          'Authorization': `Bearer ${supabaseKey}`,
          'Prefer': 'return=minimal'
        },
        body: JSON.stringify({
          email: email || null,
          phone: phone || null,
          twitter_handle: twitterHandle || null
        })
      });

      if (response.ok) {
        setSubmitted(true);
        setError('');
        setTimeout(() => {
          setSubmitted(false);
          setEmail('');
          setPhone('');
          setTwitterHandle('');
        }, 3000);
      } else {
        const data = await response.json();
        if (data.message?.includes('duplicate')) {
          setError('Email already registered');
        } else {
          setError('Something went wrong. Please try again.');
        }
      }
    } catch (err) {
      setError('Failed to submit. Please try again.');
      console.error('Error:', err);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-950/50 backdrop-blur-sm fixed w-full z-10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <img
              src="/pelicanlogotransparent.png"
              alt="Pelican Logo"
              className="w-12 h-12 drop-shadow-lg"
            />
            <span className="text-xl font-bold">Pelican</span>
          </div>
          <button className="px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 transition-colors text-sm font-medium">
            Get Early Access
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm font-medium mb-6">
            AI-Powered Trading Assistant
          </div>

          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-purple-100 to-purple-400 bg-clip-text text-transparent">
            A True AI Trading Assistant
          </h1>

          <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
            An AI agent that understands markets, writes strategies, and analyzes data.
            Build and deploy trading systems through conversation.
          </p>

          {/* Email Signup */}
          <div className="max-w-md mx-auto">
            <div className="flex flex-col gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Email (optional)"
                className="px-4 py-3 rounded-lg bg-slate-800/50 border border-slate-700 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all"
              />
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Phone number (optional)"
                className="px-4 py-3 rounded-lg bg-slate-800/50 border border-slate-700 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all"
              />
              <input
                type="text"
                value={twitterHandle}
                onChange={(e) => setTwitterHandle(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Twitter/X handle (optional)"
                className="px-4 py-3 rounded-lg bg-slate-800/50 border border-slate-700 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all"
              />
              <button
                onClick={handleSubmit}
                disabled={!email && !phone && !twitterHandle}
                className="px-6 py-3 rounded-lg bg-purple-600 hover:bg-purple-700 transition-colors font-medium flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitted ? 'Subscribed!' : 'Get Notified'}
                {!submitted && <ArrowRight className="w-4 h-4" />}
              </button>
            </div>
            {error && <p className="text-sm text-red-400 mt-2">{error}</p>}
            <p className="text-sm text-slate-400 mt-3">
              Join the waitlist for early access
            </p>
          </div>

          <div className="mt-12 text-sm text-slate-400">
            <ChevronDown className="w-5 h-5 mx-auto animate-bounce" />
          </div>
        </div>
      </section>

      {/* What Pelican Does */}
      <section className="py-20 px-6 border-t border-slate-800">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-16">What Pelican Does</h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 hover:border-purple-500/50 transition-all">
              <Terminal className="w-10 h-10 text-purple-400 mb-4" />
              <h3 className="text-xl font-semibold mb-3">Strategy Development</h3>
              <p className="text-slate-400">
                Write trading strategies in natural language. Pelican generates code and optimizes parameters automatically.
              </p>
            </div>

            <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 hover:border-purple-500/50 transition-all">
              <Brain className="w-10 h-10 text-purple-400 mb-4" />
              <h3 className="text-xl font-semibold mb-3">Market Analysis</h3>
              <p className="text-slate-400">
                Analyze price action, identify patterns, run statistical tests, and generate insights from market data in real-time.
              </p>
            </div>

            <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 hover:border-purple-500/50 transition-all">
              <Zap className="w-10 h-10 text-purple-400 mb-4" />
              <h3 className="text-xl font-semibold mb-3">Strategy Deployment</h3>
              <p className="text-slate-400">
                Deploy strategies to live markets and manage risk. Full control with intelligent guardrails.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-20 px-6 bg-slate-900/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Our Mission</h2>

          <div className="space-y-6 text-slate-300">
            <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-3 text-white">Democratize Algorithmic Trading</h3>
              <p>
                Professional-grade trading tools shouldn't require a team of quants and engineers. Pelican makes systematic trading accessible to anyone who understands markets.
              </p>
            </div>

            <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-3 text-white">Think in Ideas, Not Code</h3>
              <p>
                Focus on trading logic and market intuition. Pelican handles the technical complexity—from data processing to deployment infrastructure.
              </p>
            </div>

            <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-3 text-white">Ship Faster, Trade Smarter</h3>
              <p>
                Iterate on strategies in minutes instead of weeks. Test hypotheses, analyze results, and deploy to production without context switching.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-purple-900/20 to-slate-900/20 border-t border-slate-800">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Transform Your Trading?
          </h2>
          <p className="text-slate-300 mb-8 text-lg">
            Join the waitlist and be among the first to experience Pelican when we launch
          </p>

          <div className="max-w-md mx-auto flex flex-col gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Email (optional)"
              className="px-4 py-3 rounded-lg bg-slate-800/50 border border-slate-700 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all"
            />
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Phone number (optional)"
              className="px-4 py-3 rounded-lg bg-slate-800/50 border border-slate-700 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all"
            />
            <input
              type="text"
              value={twitterHandle}
              onChange={(e) => setTwitterHandle(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Twitter/X handle (optional)"
              className="px-4 py-3 rounded-lg bg-slate-800/50 border border-slate-700 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all"
            />
            <button
              onClick={handleSubmit}
              disabled={!email && !phone && !twitterHandle}
              className="px-6 py-3 rounded-lg bg-purple-600 hover:bg-purple-700 transition-colors font-medium flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitted ? 'Subscribed!' : 'Join Waitlist'}
              {!submitted && <ArrowRight className="w-4 h-4" />}
            </button>
          </div>
          {error && <p className="text-sm text-red-400 mt-2">{error}</p>}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-8 px-6">
        <div className="max-w-6xl mx-auto text-center text-slate-400 text-sm">
          <p>© 2025 Pelican. Built by traders who wanted institutional grade analytics.</p>
        </div>
      </footer>
    </div>
  );
}
