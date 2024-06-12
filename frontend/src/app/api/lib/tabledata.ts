
    // Fetch table data from server on client-side
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:4000/show-table-user", {
          method : "GET",
          headers : {
            "Content-Type" : "application/json",
          }
        });
        const data = await response.json()
        console.log(data)
        
      } catch (error) {
        console.log("Error while fetching data:", error);
      }
    };

    // lib/api.ts
// async function tabledata(emailid: any, password: any) {
//     const response = await fetch("http://localhost:8000/lmsusers/login", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ emailid, password }),
//     });
//     // if (!response.ok) {
//     //   const errorData = await response.json();
//     //   if (response.status === 401) {
//     //     throw new Error(errorData.message || "Incorrect password");
//     //   } else if (response.status === 404) {
//     //     throw new Error(errorData.message || "User not found");
//     //   } else {
//     //     throw new Error("An error occurred while logging in");
//     //   }
//     // }
//     const data = await response.json();
//     return data;
//   }

  export  {fetchData}