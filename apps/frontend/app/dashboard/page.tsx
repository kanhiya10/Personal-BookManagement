"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { fetchAllBooks } from "@/service/book";
import BookGrid from "@/components/BookGrid";
import ReadingStats from "@/components/ReadingStats";
import { DashboardData } from "@/types/types";
import Link from "next/link";


export default function DashboardPage() {
    const { user } = useAuth();

    const [dashboardData, setDashboardData] =
        useState<DashboardData | null>(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadDashboard = async () => {
            try {
                const response = await fetchAllBooks();
                console.log(response);
                setDashboardData(response.data.data);
            } catch (error) {
                console.error("Error fetching dashboard:", error);
            } finally {
                setLoading(false);
            }
        };

        loadDashboard();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <div className="mb-8 flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold">Your Reading Dashboard</h2>
                    <p className="text-gray-500">
                        Track your reading progress and manage your books.
                    </p>
                </div>

                <Link
                    href="/dashboard/collection"
                    className="rounded-lg bg-blue-600 px-5 py-3 font-medium text-white transition hover:bg-blue-700"
                >
                    Manage Collection
                </Link>
            </div>

            <ReadingStats
                totalBooks={dashboardData?.totalBooks ?? 0}
                completed={dashboardData?.completed ?? 0}
                reading={dashboardData?.reading ?? 0}
                wantToRead={dashboardData?.wantToRead ?? 0}
            />

            <BookGrid books={dashboardData?.books ?? []} />
        </div>
    );
}