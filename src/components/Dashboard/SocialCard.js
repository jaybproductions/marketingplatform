import React, { useEffect, useState } from "react";
import { Card, CardContent, Button, Grid } from "@material-ui/core";
import { GetSocialPostsFromFirebase } from "../../utils/Database/Social/GetSocialPostsFromFirebase";

function SocialCard({ user }) {
  const [socialData, setSocialData] = useState(null);
  const [todayPosts, setTodayPosts] = useState(null);
  useEffect(() => {
    handleGetDataFromApi();
  }, [user]);
  const handleGetDataFromApi = async () => {
    console.log(user);
    const socialData = await GetSocialPostsFromFirebase(user);
    const filtered = socialData.filter((data) => {
      let dayToCheck = data.start.toISOString().slice(0, 10);
      let today = new Date().toISOString().slice(0, 10);
      if (dayToCheck === today) {
        return data;
      }
    });
    setSocialData(socialData);
    setTodayPosts(filtered);
  };
  return (
    <Card>
      <CardContent>
        <Grid container spacing={2} justify="center">
          <Grid item xs={12}>
            Your Social Posts
          </Grid>
          <Grid item xs={12}>
            {todayPosts && (
              <> You have {todayPosts.length} posts scheduled for today. </>
            )}
          </Grid>
          <Grid item xs={12}>
            You have X posts scheduled for this month.
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

export default SocialCard;
