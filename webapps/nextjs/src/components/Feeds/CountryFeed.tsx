"use client";
import Link from "next/link";
import * as gbl from "@/globals";
import { useState, useEffect } from "react";
import SelectInput from "@/Inputs/SelectInput";
import getSortedData from "@/lib/getSortedData";
import LoadingContainer from "@/components/LoadingContainer";
import getAllCountries from "@/lib/countries/getAllCountries";

const CountryFeed: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [countries, setCountries] = useState<Country[]>([]);
  const [currentSort, setCurrentSort] = useState<"asc" | "desc">("asc");
  const [continent, setContinent] = useState<Continent | "all" | null>(null);

  const fetchCountries = async (item: Continent | "all"): Promise<void> => {
    if (item === continent) return;
    setIsLoading(true);

    try {
      var response: ApiResponse;

      if (item === "all") {
        response = await getAllCountries({ limit: 200 });
      } else {
        response = await getAllCountries({ limit: 200, and: "continent", andValue: item });
      }

      if (response.error) throw new Error(response.message);
      const data = getSortedData({ data: response.data || [], sort: currentSort, key: "displayName" });

      setCountries(data);
      setContinent(item);
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (continent) return;
    (async () => {
      await fetchCountries("all");
    })();
  }, []);

  return (
    <div id="country-feed">
      <div>
        <div className="controls">
          <SelectInput
            label="Continent"
            name="continent-select"
            onChange={fetchCountries}
            defaultValue={{ value: "all", label: "All" }}
            options={[{ value: "all", label: "All" }, ...gbl.continentOptions]}
          />

          <SelectInput
            label="sort"
            name="sort-select"
            defaultValue={{ value: "asc", label: "A to Z" }}
            onChange={(value: any) => {
              const data = getSortedData({ data: countries, sort: value, key: "displayName" });
              setCurrentSort(value);
              setCountries(data);
            }}
            options={[
              { value: "asc", label: "A to Z" },
              { value: "desc", label: "Z to A" },
            ]}
          />
        </div>

        <div className="body">
          {isLoading ? (
            <LoadingContainer />
          ) : (
            <>
              {countries.length === 0 ? (
                <p>No countries to display.</p>
              ) : (
                <>
                  {countries.map((country: Country, key: number) => (
                    <div className="card" key={key}>
                      <Link key={key} href={`/countries/${country._id}`} className="link-wrapper" />

                      <div className="inner">
                        <h6>{country.displayName}</h6>
                      </div>
                    </div>
                  ))}
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CountryFeed;
