function groupByDay(data) {
  return data.reduce((result, item) => {
    const day = new Date(item.date).toISOString().split("T")[0];
    console.log({ result });

    if (!result[day]) {
      result[day] = [];
    }
    result[day].push(item);
    return result;
  }, {});
}

// Contoh data
const data = [
  {
    id: "b731c088-93d5-4598-836a-be0c5c1d13f9",
    count: 334234,
    date: "2024-12-12T17:00:00.000Z",
    category: {
      id: "4f925e68-518b-46ea-852c-8d8abfa3bb1c",
      name: "cuyy",
    },
    wallet_id: "0ddb0906-d96f-4715-8970-40ff08a31e89",
    created_at: "2024-12-13T03:08:11.386Z",
  },
  {
    id: "653b9a9f-c2e1-4ca3-85c3-ee1f93e0eea1",
    count: 212,
    date: "2024-12-04T17:00:00.000Z",
    category: {
      id: "3e9cff0a-4bfd-43f2-b246-9e8cc76dc72d",
      name: "Cuy",
    },
    wallet_id: "0ddb0906-d96f-4715-8970-40ff08a31e89",
    created_at: "2024-12-13T03:07:21.941Z",
  },
];

// Menjalankan fungsi
const groupedData = groupByDay(data);
console.log(groupedData);
