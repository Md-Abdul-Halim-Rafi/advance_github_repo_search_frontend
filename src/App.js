import React, { lazy, Suspense } from "react";

import Loader from "Components/Loader/Loader";
const SearchPage = lazy(() => import("Pages/SearchPage/SearchPage"));

export default function App() {
	return (
		<div>
			<Suspense fallback={<Loader />}>
				<SearchPage />
			</Suspense>
		</div>
	);
}