'use client';

import React, { useState } from 'react';
import Image from 'next/image';
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
        <div className="max-w-6xl mx-auto px-4 py-3 md:px-6 md:py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Image
              src="/pelicanlogotransparent.png"
              alt="Pelican Logo"
              width={32}
              height={32}
              className="w-8 h-8 md:w-10 md:h-10 drop-shadow-lg"
            />
            <span className="text-lg md:text-xl font-bold">Pelican</span>
          </div>
          <button className="px-3 py-1.5 text-xs md:px-4 md:py-2 md:text-sm rounded-lg bg-purple-600 hover:bg-purple-700 transition-colors font-medium">
            Get Early Access
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-24 pb-12 px-4 md:pt-32 md:pb-20 md:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs md:text-sm font-medium mb-4 md:mb-6">
            AI-Powered Trading Assistant
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 bg-gradient-to-r from-white via-purple-100 to-purple-400 bg-clip-text text-transparent px-2">
            A True AI Trading Assistant
          </h1>

          <p className="text-base md:text-lg lg:text-xl text-slate-300 mb-8 md:mb-10 max-w-2xl mx-auto px-2">
            An AI agent that understands markets, writes strategies, and analyzes data.
            Build and deploy trading systems through conversation.
          </p>

          {/* Email Signup */}
          <div className="max-w-md mx-auto px-4 md:px-0">
            <div className="flex flex-col gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Email (optional)"
                className="w-full px-4 py-3 md:py-3.5 rounded-lg bg-slate-800/50 border border-slate-700 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all text-base"
              />
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Phone number (optional)"
                className="w-full px-4 py-3 md:py-3.5 rounded-lg bg-slate-800/50 border border-slate-700 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all text-base"
              />
              <input
                type="text"
                value={twitterHandle}
                onChange={(e) => setTwitterHandle(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Twitter/X handle (optional)"
                className="w-full px-4 py-3 md:py-3.5 rounded-lg bg-slate-800/50 border border-slate-700 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all text-base"
              />
              <button
                onClick={handleSubmit}
                disabled={!email && !phone && !twitterHandle}
                className="w-full min-h-[44px] px-6 py-3 md:py-3.5 rounded-lg bg-purple-600 hover:bg-purple-700 transition-colors font-medium flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed text-base"
              >
                {submitted ? 'Subscribed!' : 'Get Notified'}
                {!submitted && <ArrowRight className="w-4 h-4" />}
              </button>
            </div>
            {error && <p className="text-sm text-red-400 mt-2 text-center">{error}</p>}
            <p className="text-sm text-slate-400 mt-3 text-center">
              Join the waitlist for early access
            </p>
          </div>

          <div className="mt-8 md:mt-12 text-sm text-slate-400">
            <ChevronDown className="w-5 h-5 mx-auto animate-bounce" />
          </div>
        </div>
      </section>

      {/* What Pelican Does */}
      <section className="py-12 px-4 md:py-20 md:px-6 border-t border-slate-800">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-16">What Pelican Does</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
            <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-5 md:p-6 hover:border-purple-500/50 transition-all">
              <Terminal className="w-8 h-8 md:w-10 md:h-10 text-purple-400 mb-3 md:mb-4" />
              <h3 className="text-lg md:text-xl font-semibold mb-2 md:mb-3">Strategy Development</h3>
              <p className="text-sm md:text-base text-slate-400 leading-relaxed">
                Write trading strategies in natural language. Pelican generates code and optimizes parameters automatically.
              </p>
            </div>

            <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-5 md:p-6 hover:border-purple-500/50 transition-all">
              <Brain className="w-8 h-8 md:w-10 md:h-10 text-purple-400 mb-3 md:mb-4" />
              <h3 className="text-lg md:text-xl font-semibold mb-2 md:mb-3">Market Analysis</h3>
              <p className="text-sm md:text-base text-slate-400 leading-relaxed">
                Analyze price action, identify patterns, run statistical tests, and generate insights from market data in real-time.
              </p>
            </div>

            <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-5 md:p-6 hover:border-purple-500/50 transition-all">
              <Zap className="w-8 h-8 md:w-10 md:h-10 text-purple-400 mb-3 md:mb-4" />
              <h3 className="text-lg md:text-xl font-semibold mb-2 md:mb-3">Strategy Deployment</h3>
              <p className="text-sm md:text-base text-slate-400 leading-relaxed">
                Deploy strategies to live markets and manage risk. Full control with intelligent guardrails.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-12 px-4 md:py-20 md:px-6 bg-slate-900/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12">Our Mission</h2>

          <div className="space-y-4 md:space-y-6 text-slate-300">
            <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-5 md:p-6">
              <h3 className="text-lg md:text-xl font-semibold mb-2 md:mb-3 text-white">Democratize Algorithmic Trading</h3>
              <p className="text-sm md:text-base leading-relaxed">
                Professional-grade trading tools shouldn&apos;t require a team of quants and engineers. Pelican makes systematic trading accessible to anyone who understands markets.
              </p>
            </div>

            <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-5 md:p-6">
              <h3 className="text-lg md:text-xl font-semibold mb-2 md:mb-3 text-white">Think in Ideas, Not Code</h3>
              <p className="text-sm md:text-base leading-relaxed">
                Focus on trading logic and market intuition. Pelican handles the technical complexity—from data processing to deployment infrastructure.
              </p>
            </div>

            <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-5 md:p-6">
              <h3 className="text-lg md:text-xl font-semibold mb-2 md:mb-3 text-white">Ship Faster, Trade Smarter</h3>
              <p className="text-sm md:text-base leading-relaxed">
                Iterate on strategies in minutes instead of weeks. Test hypotheses, analyze results, and deploy to production without context switching.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 px-4 md:py-20 md:px-6 bg-gradient-to-r from-purple-900/20 to-slate-900/20 border-t border-slate-800">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4 px-2">
            Ready to Transform Your Trading?
          </h2>
          <p className="text-base md:text-lg text-slate-300 mb-6 md:mb-8 px-4">
            Join the waitlist and be among the first to experience Pelican when we launch
          </p>

          <div className="max-w-md mx-auto px-4 md:px-0">
            <div className="flex flex-col gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Email (optional)"
                className="w-full px-4 py-3 md:py-3.5 rounded-lg bg-slate-800/50 border border-slate-700 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all text-base"
              />
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Phone number (optional)"
                className="w-full px-4 py-3 md:py-3.5 rounded-lg bg-slate-800/50 border border-slate-700 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all text-base"
              />
              <input
                type="text"
                value={twitterHandle}
                onChange={(e) => setTwitterHandle(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Twitter/X handle (optional)"
                className="w-full px-4 py-3 md:py-3.5 rounded-lg bg-slate-800/50 border border-slate-700 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all text-base"
              />
              <button
                onClick={handleSubmit}
                disabled={!email && !phone && !twitterHandle}
                className="w-full min-h-[44px] px-6 py-3 md:py-3.5 rounded-lg bg-purple-600 hover:bg-purple-700 transition-colors font-medium flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed text-base"
              >
                {submitted ? 'Subscribed!' : 'Join Waitlist'}
                {!submitted && <ArrowRight className="w-4 h-4" />}
              </button>
            </div>
            {error && <p className="text-sm text-red-400 mt-2 text-center">{error}</p>}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-6 px-4 md:py-8 md:px-6">
        <div className="max-w-6xl mx-auto text-center text-slate-400 text-xs md:text-sm">
          <p>© 2025 Pelican. Built by traders who wanted institutional grade analytics.</p>
        </div>
      </footer>
    </div>
  );
}
