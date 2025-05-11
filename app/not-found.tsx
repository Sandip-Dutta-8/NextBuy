'use client'
import React from 'react'
import { ArrowLeft, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 px-4">
            <div className="w-full max-w-md mx-auto text-center">
                {/* Error Code */}
                <h1 className="text-9xl font-extrabold text-gray-700 tracking-widest">
                    4<span className="text-primary">0</span>4
                </h1>

                {/* Animated SVG Illustration */}
                <div className="w-full flex justify-center my-8">
                    <svg
                        viewBox="0 0 200 200"
                        className="w-64 h-64 text-gray-400"
                    >
                        {/* Magnifying glass */}
                        <circle cx="80" cy="80" r="30" fill="none" stroke="currentColor" strokeWidth="6" opacity="0.8" />
                        <line
                            x1="100"
                            y1="100"
                            x2="130"
                            y2="130"
                            stroke="currentColor"
                            strokeWidth="8"
                            strokeLinecap="round"
                        />

                        {/* Question marks floating around */}
                        <text x="50" y="40" fontSize="20" fill="currentColor" opacity="0.6">?</text>
                        <text x="120" y="60" fontSize="16" fill="currentColor" opacity="0.4">?</text>
                        <text x="30" y="100" fontSize="24" fill="currentColor" opacity="0.5">?</text>
                        <text x="110" y="150" fontSize="18" fill="currentColor" opacity="0.7">?</text>
                        <text x="140" y="90" fontSize="22" fill="currentColor" opacity="0.5">?</text>
                    </svg>
                </div>

                {/* Message */}
                <h2 className="text-2xl font-bold text-gray-800 mb-3">Page Not Found</h2>
                <p className="text-gray-600 mb-8">
                    The page you're looking for doesn't exist or has been moved.
                </p>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Button
                        onClick={() => window.location.href = '/'}
                        className="flex items-center gap-2 px-6 py-2"
                    >
                        <ArrowLeft size={18} />
                        Back to Home
                    </Button>

                    <Button
                        variant="outline"
                        onClick={() => window.location.href = '/'}
                        className="flex items-center gap-2 px-6 py-2"
                    >
                        <Search size={18} />
                        Search Site
                    </Button>
                </div>
            </div>
        </div>
    )
}