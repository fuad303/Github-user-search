import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import CircleAnimation from "./components/circleAnimation";

interface userProps {
  login: string;
  html_url: string;
  id: number;
  avatar_url: string;
}

const App = () => {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [users, setUsers] = useState<userProps[]>([]);
  const fetchData = useCallback(async () => {
    if (!query) return;
    setLoading(true);
    setError("");
    try {
      const res = await axios.get(
        `https://api.github.com/search/users?q=${query}`,
        {
          headers: {
            Authorization: "",
          },
        }
      );
      setUsers(res.data.items);
      console.log(res.data.items);
    } catch (err: any) {
      setError(
        err.response?.data?.message || "An Error occurred, please try again"
      );
    } finally {
      setLoading(false);
    }
  }, [query]);

  useEffect(() => {
    const debounce = setTimeout(() => {
      fetchData();
    }, 1000);
    return () => {
      clearTimeout(debounce);
    };
  }, [fetchData]);
  return (
    <div className="flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8">
      <form
        className="flex flex-col sm:flex-row items-center w-full max-w-md gap-4 mb-20"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <input
          autoFocus
          className="p-3 w-full rounded-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Search GitHub users"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="w-full sm:w-auto px-4 py-2 bg-blue-800 text-white rounded-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
          Search
        </button>
      </form>

      {
        <div className="">
          {loading ? (
            <CircleAnimation />
          ) : (
            <div className="">
              {error ? (
                <span>{error}</span>
              ) : (
                <div className=" grid gap-5">
                  {users.map((user) => (
                    <div
                      key={user.id}
                      className="bg-white flex justify-between items-center p-2 w-72 rounded-md"
                    >
                      <img
                        src={user.avatar_url}
                        className="size-12 rounded-full"
                        loading="lazy"
                      />
                      <a
                        href={user.html_url}
                        className="bg-blue-800 text-white p-2 rounded-md "
                      >
                        {user.login}
                      </a>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      }
    </div>
  );
};

export default App;
