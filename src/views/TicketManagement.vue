<template>
  <div class="min-h-screen bg-slate-100">
    <!-- Header -->
    <header class="bg-white shadow-sm border-b border-slate-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div class="flex justify-between items-center">
          <div>
            <h1 class="text-3xl font-bold text-slate-900">Ticket Management</h1>
            <p class="text-slate-600 mt-1">Manage and track your support tickets</p>
          </div>
          <div class="flex gap-3">
            <button
              @click="navigateToDashboard"
              class="bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 px-4 py-2 rounded-lg transition-all"
            >
              ← Back to Dashboard
            </button>
            <button
              @click="navigateToHome"
              class="bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 px-4 py-2 rounded-lg transition-all"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Form Section -->
        <div class="lg:col-span-1">
          <div class="bg-white shadow-lg border-0 rounded-xl overflow-hidden">
            <div class="bg-blue-600 text-white p-6">
              <h3 class="text-xl font-semibold">
                {{ editingId ? '✏️ Edit Ticket' : '➕ Create New Ticket' }}
              </h3>
            </div>
            <div class="p-6">
              <form @submit.prevent="handleAddOrUpdate" class="space-y-5">
                <div>
                  <label class="block text-sm font-semibold text-slate-700 mb-2">
                    Title <span class="text-red-500">*</span>
                  </label>
                  <input
                    v-model="title"
                    type="text"
                    placeholder="Enter ticket title..."
                    :class="`w-full px-4 py-3 border-2 rounded-lg text-sm bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${
                      errors.title ? 'border-red-300 focus:ring-red-500' : 'border-slate-300'
                    }`"
                  />
                  <p v-if="errors.title" class="text-red-600 text-sm mt-2 flex items-center">
                    <span class="mr-1">⚠️</span> {{ errors.title }}
                  </p>
                </div>

                <div>
                  <label class="block text-sm font-semibold text-slate-700 mb-2">
                    Description
                  </label>
                  <textarea
                    v-model="description"
                    placeholder="Describe the issue or request..."
                    class="w-full px-4 py-3 border-2 border-slate-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all resize-none"
                    rows="4"
                  />
                </div>

                <div>
                  <label class="block text-sm font-semibold text-slate-700 mb-2">
                    Status <span class="text-red-500">*</span>
                  </label>
                  <select
                    v-model="status"
                    :class="`w-full px-4 py-3 border-2 rounded-lg text-sm bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${
                      errors.status ? 'border-red-300 focus:ring-red-500' : 'border-slate-300'
                    }`"
                  >
                    <option value="open">🟢 Open</option>
                    <option value="in_progress">🟡 In Progress</option>
                    <option value="closed">🔴 Closed</option>
                  </select>
                  <p v-if="errors.status" class="text-red-600 text-sm mt-2 flex items-center">
                    <span class="mr-1">⚠️</span> {{ errors.status }}
                  </p>
                </div>

                <div class="space-y-3">
                  <button
                    type="submit"
                    class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-all transform hover:scale-105"
                  >
                    {{ editingId ? '💾 Update Ticket' : '🚀 Create Ticket' }}
                  </button>

                  <button
                    v-if="editingId"
                    type="button"
                    class="w-full bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-700 font-semibold py-3 rounded-lg transition-all"
                    @click="cancelEdit"
                  >
                    ❌ Cancel Edit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <!-- Tickets List Section -->
        <div class="lg:col-span-2">
          <div class="bg-white rounded-xl shadow-lg p-6">
            <div class="flex items-center justify-between mb-6">
              <h2 class="text-2xl font-bold text-slate-900 flex items-center">
                <span class="mr-2">🎫</span> Tickets
                <span class="ml-2 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                  {{ tickets.length }}
                </span>
              </h2>
            </div>

            <div v-if="tickets.length === 0" class="text-center py-16">
              <div class="text-6xl mb-4">📭</div>
              <h3 class="text-xl font-semibold text-slate-700 mb-2">No tickets yet</h3>
              <p class="text-slate-500">Create your first ticket to get started!</p>
            </div>

            <div v-else class="space-y-4">
              <div
                v-for="ticket in tickets"
                :key="ticket.id"
                class="bg-slate-50 border border-slate-200 rounded-lg shadow-sm hover:shadow-md transition-all overflow-hidden"
              >
                <div class="p-6">
                  <div class="flex justify-between items-start gap-4">
                    <div class="flex-1">
                      <h3 class="text-lg font-bold text-slate-900 mb-2 flex items-center">
                        <span class="mr-2">📋</span> {{ ticket.title }}
                      </h3>
                      <p v-if="ticket.description" class="text-slate-600 text-sm mb-4 leading-relaxed">
                        {{ ticket.description }}
                      </p>
                      <div class="flex items-center gap-4 text-sm">
                        <span
                          class="px-3 py-1 rounded-full font-semibold text-xs flex items-center"
                          :style="{
                            color: getStatusColor(ticket.status),
                            backgroundColor: getStatusBgColor(ticket.status)
                          }"
                        >
                          {{ ticket.status === 'in_progress' ? '🟡 In Progress' : ticket.status === 'open' ? '🟢 Open' : '🔴 Closed' }}
                        </span>
                        <span class="text-slate-500 flex items-center">
                          <span class="mr-1">📅</span>
                          {{ formatDate(ticket.createdAt) }}
                        </span>
                      </div>
                    </div>
                    <div class="flex gap-2">
                      <button
                        @click="handleEdit(ticket)"
                        class="bg-blue-50 hover:bg-blue-100 border border-blue-300 text-blue-700 font-semibold px-4 py-2 rounded-lg transition-all"
                      >
                        ✏️ Edit
                      </button>
                      <button
                        @click="setDeleteConfirm(ticket.id)"
                        class="bg-red-50 hover:bg-red-100 border border-red-300 text-red-700 font-semibold px-4 py-2 rounded-lg transition-all"
                      >
                        🗑️ Delete
                      </button>
                    </div>
                  </div>

                  <!-- Delete Confirmation -->
                  <div v-if="deleteConfirm === ticket.id" class="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p class="text-sm font-semibold text-red-800 mb-4 flex items-center">
                      <span class="mr-2">⚠️</span> Are you sure you want to delete this ticket?
                    </p>
                    <div class="flex gap-3">
                      <button
                        @click="handleDelete(ticket.id)"
                        class="bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded-lg transition-all"
                      >
                        🗑️ Confirm Delete
                      </button>
                      <button
                        @click="setDeleteConfirm(null)"
                        class="bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 font-semibold px-4 py-2 rounded-lg transition-all"
                      >
                        ❌ Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
const title = ref('')
const description = ref('')
const status = ref('open')
const errors = ref({})
const editingId = ref(null)
const deleteConfirm = ref(null)

onMounted(() => {
  // Load tickets from localStorage
  const savedTickets = localStorage.getItem('tickets')
  if (savedTickets) {
    tickets.value = JSON.parse(savedTickets)
  }
})

const validateForm = () => {
  const newErrors = {}

  if (!title.value.trim()) {
    newErrors.title = 'Title is required'
  }

  if (!['open', 'in_progress', 'closed'].includes(status.value)) {
    newErrors.status = 'Invalid status'
  }

  errors.value = newErrors
  return Object.keys(newErrors).length === 0
}

const handleAddOrUpdate = () => {
  if (!validateForm()) {
    return
  }

  if (editingId.value) {
    // Update existing ticket
    const updatedTickets = tickets.value.map((t) =>
      t.id === editingId.value ? { ...t, title: title.value, description: description.value, status: status.value } : t
    )
    tickets.value = updatedTickets
    localStorage.setItem('tickets', JSON.stringify(updatedTickets))
    editingId.value = null
  } else {
    // Create new ticket
    const newTicket = {
      id: Date.now().toString(),
      title: title.value,
      description: description.value,
      status: status.value,
      createdAt: new Date().toISOString(),
    }
    const updatedTickets = [...tickets.value, newTicket]
    tickets.value = updatedTickets
    localStorage.setItem('tickets', JSON.stringify(updatedTickets))
  }

  title.value = ''
  description.value = ''
  status.value = 'open'
  errors.value = {}
}

const handleEdit = (ticket) => {
  editingId.value = ticket.id
  title.value = ticket.title
  description.value = ticket.description
  status.value = ticket.status
}

const handleDelete = (id) => {
  const updatedTickets = tickets.value.filter((t) => t.id !== id)
  tickets.value = updatedTickets
  localStorage.setItem('tickets', JSON.stringify(updatedTickets))
  deleteConfirm.value = null
}

const cancelEdit = () => {
  editingId.value = null
  title.value = ''
  description.value = ''
  status.value = 'open'
  errors.value = {}
}

const setDeleteConfirm = (id) => {
  deleteConfirm.value = id
}

const getStatusColor = (status) => {
  switch (status) {
    case 'open':
      return '#22c55e'
    case 'in_progress':
      return '#eab308'
    case 'closed':
      return '#ef4444'
    default:
      return '#64748b'
  }
}

const getStatusBgColor = (status) => {
  switch (status) {
    case 'open':
      return 'rgba(34, 197, 94, 0.1)'
    case 'in_progress':
      return 'rgba(234, 179, 8, 0.1)'
    case 'closed':
      return 'rgba(239, 68, 68, 0.1)'
    default:
      return '#f1f5f9'
  }
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString()
}

const navigateToDashboard = () => {
  router.push('/dashboard')
}

const navigateToHome = () => {
  router.push('/')
}
</script>

<style scoped>
/* No additional styles needed as all styling is handled by Tailwind CSS classes */
</style>
