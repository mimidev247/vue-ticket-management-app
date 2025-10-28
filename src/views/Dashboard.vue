<template>
  <div class="min-h-screen bg-slate-100">
    <!-- Header -->
    <header class="bg-white shadow-sm border-b border-slate-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div class="flex justify-between items-center">
          <div>
            <h1 class="text-3xl font-bold text-slate-900">TicketHub <span class="text-blue-600">Dashboard</span></h1>
            <p class="text-slate-600 mt-1">Overview of your ticket system</p>
          </div>
          <div class="flex gap-3">
            <button
              @click="navigateToTickets"
              class="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg transition-all transform hover:scale-105"
            >
              🎫 Manage Tickets
            </button>
            <button
              @click="navigateToHome"
              class="bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 font-semibold px-6 py-2 rounded-lg transition-all"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="mb-8">
        <h2 class="text-3xl font-bold text-slate-900 mb-2">Welcome Back! 👋</h2>
        <p class="text-slate-600">Here's an overview of your ticket management system</p>
      </div>

      <!-- Statistics Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <!-- Total Tickets -->
        <div class="bg-white shadow-lg border-0 rounded-xl overflow-hidden hover:shadow-xl transition-all transform hover:scale-105">
          <div class="bg-blue-600 text-white p-4">
            <h3 class="text-sm font-semibold flex items-center">
              <span class="mr-2">📊</span> Total Tickets
            </h3>
          </div>
          <div class="p-6">
            <div class="text-4xl font-bold text-slate-900 mb-2">{{ stats.total }}</div>
            <p class="text-sm text-slate-500">All tickets in system</p>
          </div>
        </div>

        <!-- Open Tickets -->
        <div class="bg-white shadow-lg border-0 rounded-xl overflow-hidden hover:shadow-xl transition-all transform hover:scale-105">
          <div class="bg-green-600 text-white p-4">
            <h3 class="text-sm font-semibold flex items-center">
              <span class="mr-2">🟢</span> Open
            </h3>
          </div>
          <div class="p-6">
            <div class="text-4xl font-bold text-green-600 mb-2">{{ stats.open }}</div>
            <p class="text-sm text-slate-500">Awaiting action</p>
          </div>
        </div>

        <!-- In Progress -->
        <div class="bg-white shadow-lg border-0 rounded-xl overflow-hidden hover:shadow-xl transition-all transform hover:scale-105">
          <div class="bg-yellow-600 text-white p-4">
            <h3 class="text-sm font-semibold flex items-center">
              <span class="mr-2">🟡</span> In Progress
            </h3>
          </div>
          <div class="p-6">
            <div class="text-4xl font-bold text-yellow-600 mb-2">{{ stats.inProgress }}</div>
            <p class="text-sm text-slate-500">Being worked on</p>
          </div>
        </div>

        <!-- Closed Tickets -->
        <div class="bg-white shadow-lg border-0 rounded-xl overflow-hidden hover:shadow-xl transition-all transform hover:scale-105">
          <div class="bg-red-600 text-white p-4">
            <h3 class="text-sm font-semibold flex items-center">
              <span class="mr-2">🔴</span> Closed
            </h3>
          </div>
          <div class="p-6">
            <div class="text-4xl font-bold text-red-600 mb-2">{{ stats.closed }}</div>
            <p class="text-sm text-slate-500">Resolved tickets</p>
          </div>
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="bg-white shadow-lg border-0 rounded-xl overflow-hidden">
        <div class="bg-gray-50 text-black p-4">
          <h3 class="text-xl font-semibold flex items-center">
            <span class="mr-2">⚡</span> Quick Actions
          </h3>
        </div>
        <div class="p-6">
          <p class="text-slate-600 mb-6">
            Ready to manage your tickets? Click the button below to get started.
          </p>
          <button
            @click="navigateToTickets"
            class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-all transform hover:scale-95"
          >
            🚀 Go to Ticket Management
          </button>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const tickets = ref([])
const stats = ref({
  total: 0,
  open: 0,
  inProgress: 0,
  closed: 0,
})

onMounted(() => {
  // Load tickets from localStorage
  const savedTickets = localStorage.getItem("tickets")
  if (savedTickets) {
    const parsedTickets = JSON.parse(savedTickets)
    tickets.value = parsedTickets
    calculateStats(parsedTickets)
  }
})

const calculateStats = (ticketList) => {
  const newStats = {
    total: ticketList.length,
    open: ticketList.filter((t) => t.status === "open").length,
    inProgress: ticketList.filter((t) => t.status === "in_progress").length,
    closed: ticketList.filter((t) => t.status === "closed").length,
  }
  stats.value = newStats
}

const navigateToTickets = () => {
  router.push('/tickets')
}

const navigateToHome = () => {
  router.push('/')
}
</script>

<style scoped>
/* No additional styles needed as all styling is handled by Tailwind CSS classes */
</style>
