import { Box } from "@mui/system";
import MainLayout from "../../layouts/MainLayout";
import { CircularProgress, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { SearchOutlined } from "@mui/icons-material";
import { useDebounce } from "usehooks-ts";
import { searchPost } from "../../service/post.service";
import PostWidget from "../widgets/PostWidget";
import {useSearchParams} from "react-router-dom";
import NoData from "../../components/shared/NoData";

const SearchPost = () => {
  const [searchingVal, setSearchingVal] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const debouncedValue = useDebounce<string>(searchingVal, 1000);
  const [posts, setPosts] = useState<IPost[]>([]);
  let [searchParams] = useSearchParams();


  const handleSearchPost = async () => {
    if (debouncedValue !== "") {
      const response: any = await searchPost(debouncedValue);
      setPosts(response.posts);
      return;
    }
    setPosts([]);
  };
  useEffect(() => {
    if(searchParams.get("q")){
      setSearchingVal(searchParams.get("q") as string)
    }
  },[searchParams])

  useEffect(() => {
    setIsSearching(false);
    handleSearchPost();
  }, [debouncedValue]);

  return (
    <MainLayout>
      <Box mt={1}>
        <TextField
          value={searchingVal}
          onChange={(e) => {
            setSearchingVal(e.target.value);
            setIsSearching(true);
          }}
          label={"Search something ..."}
          size={"medium"}
          InputProps={{
            endAdornment: (
              <Box sx={{ width: "30px" }}>
                {isSearching ? (
                  <CircularProgress size={20} />
                ) : (
                  <SearchOutlined fontSize={"small"} />
                )}
              </Box>
            ),
          }}
          sx={{ mb: 2 }}
          fullWidth
          autoFocus
        />
        {debouncedValue === "" ? (
          <Typography>Type something to search</Typography>
        ) : (
          <Typography>
            Search results for <strong>{debouncedValue}</strong>
          </Typography>
        )}
        {posts.length > 0 ? (
          posts.map((post: IPost) => <PostWidget key={post.id} {...post} />)
        ) : (
          <NoData />
        )}
      </Box>
    </MainLayout>
  );
};

export default SearchPost;
