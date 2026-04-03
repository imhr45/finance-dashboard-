# 💰 Finance Dashboard

A clean and interactive Finance Dashboard built with **React + Tailwind CSS** for tracking and understanding personal financial activity.

---

## 🚀 Live Demo

>https://finance-dashboard-puce-six.vercel.app/

---

## 🛠️ Tech Stack

| Technology | Usage |
|---|---|
| React (Vite) | Frontend Framework |
| Tailwind CSS | Styling |
| Recharts | Charts & Visualizations |
| Context API | State Management |
| LocalStorage | Data Persistence |
| uuid | Unique Transaction IDs |

---

## ⚙️ Setup & Installation

### Prerequisites
- Node.js v18+
- npm or yarn

### Steps

```bash
# 1. Clone the repository
git clone https://github.com/imhr45/finance-dashboard-.git

# 2. Go into the project folder
cd finance-dashboard

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev
```

App will run at `http://localhost:5173`

---

## 📁 Project Structure

```
src/
├── components/
│   ├── Dashboards/
│   │   ├── BalanceChart.jsx        # Line chart - balance trend
│   │   ├── CategoryChart.jsx       # Pie chart - spending breakdown
│   │   └── SummaryCards.jsx        # Balance, Income, Expense cards
│   ├── Insights/
│   │   └── InsightsPanel.jsx       # Insights + monthly comparison chart
│   ├── Transactions/
│   │   ├── AddTransactionForm.jsx  # Add / Edit modal form
│   │   └── TransactionTable.jsx    # Transaction list with filters & export
│   ├── Navbar.jsx                  # Top navigation bar
│   └── RoleSelector.jsx            # Viewer / Admin role switcher
├── context/
│   └── AppContext.jsx              # Global state (Context API)
├── Data/
│   └── mockTransaction.js          # Sample transaction data
├── App.jsx                         # Root component
└── main.jsx                        # React entry point
```

---

## ✨ Features

### 1. 📊 Dashboard Overview
- **Summary Cards** — Total Balance, Income, and Expenses displayed prominently
- **Balance Trend** — Line chart showing income/expense over time
- **Spending Breakdown** — Colored Pie chart with category-wise expense split

### 2. 💳 Transactions Section
- View all transactions with Date, Category, Amount, and Type
- **Search** by category name
- **Filter** by type (Income / Expense)
- **Sort** by Newest or Oldest first
- Income shown in green, Expense in red for quick scanning
- Empty state message when no transactions match filters

### 3. 🔐 Role Based UI
Switch between roles using the dropdown in the top-right corner:

| Feature | Viewer | Admin |
|---|---|---|
| View transactions | ✅ | ✅ |
| View charts & insights | ✅ | ✅ |
| Export CSV | ✅ | ✅ |
| Add transaction | ❌ | ✅ |
| Edit transaction | ❌ | ✅ |
| Delete transaction | ❌ | ✅ |

### 4. 💡 Insights Panel
- Highest spending category highlighted
- Total Income vs Total Expenses summary cards
- **Monthly Comparison Bar Chart** — side-by-side income vs expense per month

### 5. 📤 Export CSV
- Export currently filtered transactions as a `.csv` file
- Works for both Viewer and Admin roles
- File downloads automatically as `transactions.csv`

### 6. 💾 Data Persistence
- All transactions are saved to **LocalStorage**
- Data remains intact even after page refresh

---

## 🎨 Design Decisions

- **Tailwind CSS** used for rapid, responsive styling
- **Recharts** chosen for its simple React integration and clean visuals
- **Context API** used instead of Redux to keep the project lightweight — state is simple enough that a global context is sufficient
- **Mock data** provided in `mockTransaction.js` to demonstrate all features out of the box
- Form is rendered inside `TransactionTable` component to keep edit/add state co-located

---

## 🔮 Possible Future Enhancements

- Dark mode toggle
- Backend/API integration
- Date range filter
- Budget limit alerts
- Pagination for large transaction lists

---

## 👨‍💻 Author

**Himanshu Ranjan**

Frontend Developer Intern Applicant

📧 imhr5.meet@gmail.com
