const state = {
  scenario: 'billing',
  flowStage: 0,
  outboundLog: [],
  conversations: {
    billing: {
      title: 'Claim denial explanation',
      customer: 'My claim was denied and I do not understand why. I need a clear explanation.',
      assistant: 'I can explain the denial reason in plain language, check the policy details, and route this for review if needed.',
      reasons: [
        'High priority because the customer is requesting a denial explanation.',
        'Best next action is to acknowledge the concern, identify the denial code, and confirm the policy basis.',
        'Suggested tone: clear, calm, and legally safe.',
      ],
      replies: ['Explain denial reason', 'Request claim number', 'Open appeal review'],
      flow: [
        {
          customer: 'My claim was denied and I do not understand why. I need a clear explanation.',
          assistant: 'I can explain the denial reason in plain language, check the policy details, and route this for review if needed.',
          replies: ['Show denial reason', 'Request claim number', 'Open appeal review'],
        },
        {
          customer: 'I have the claim number now. Please tell me the exact reason in plain language.',
          assistant: 'The denial reason is D-202, missing documentation. The claim did not include the required support file.',
          replies: ['Show missing document', 'Prepare appeal summary', 'Route to supervisor'],
        },
        {
          customer: 'Please open the appeal review and send it to the supervisor.',
          assistant: 'Done. I have routed it to the appeal queue and attached the policy note for review.',
          replies: ['Reset demo', 'Keep as example'],
        },
      ],
      policy: [
        { code: 'D-101', label: 'Coverage mismatch', detail: 'The service is outside the current plan coverage window.' },
        { code: 'D-202', label: 'Missing documentation', detail: 'The request was incomplete and required supporting evidence.' },
        { code: 'D-303', label: 'Manual review required', detail: 'The case needs a supervisor because the policy exception is unclear.' },
      ],
      email: [
        { from: 'maya.patel@contoso.com', subject: 'Need explanation for denied claim 88421', status: 'Urgent', tag: 'Claims' },
        { from: 'jay.fernandez@contoso.com', subject: 'Appeal request for denial code 14B', status: 'In review', tag: 'Appeals' },
      ],
      tasks: [
        { title: 'Policy lookup', queue: 'Claims queue', owner: 'Agent A', status: 'Open' },
        { title: 'Appeal review', queue: 'Supervisor queue', owner: 'Agent B', status: 'Waiting' },
      ],
    },
    delivery: {
      title: 'Coverage denial explanation',
      customer: 'My request was denied because of coverage, but I think the rule was applied incorrectly.',
      assistant: 'I would point to the specific coverage rule, compare it against the case facts, and flag it for manual review if the customer disputes it.',
      reasons: [
        'Coverage denials need a precise explanation of the rule and exception handling.',
        'Create a review task when the customer contests the policy interpretation.',
        'Suggested tone: factual, patient, and non-defensive.',
      ],
      replies: ['Explain coverage rule', 'Escalate for review', 'Summarize next steps'],
      flow: [
        {
          customer: 'My request was denied because of coverage, but I think the rule was applied incorrectly.',
          assistant: 'I would point to the specific coverage rule, compare it against the case facts, and flag it for manual review if the customer disputes it.',
          replies: ['Show coverage rule', 'Escalate for review', 'Summarize next steps'],
        },
        {
          customer: 'I reviewed the policy and I still think this should have been covered.',
          assistant: 'The denial is based on D-104, coverage exclusion. I can show the exact rule and prepare a supervisor review if needed.',
          replies: ['Show exclusion note', 'Open review', 'Reset demo'],
        },
        {
          customer: 'Please escalate this for review and tell me what happens next.',
          assistant: 'I have routed it to compliance review and added the policy summary for the supervisor.',
          replies: ['Keep as example', 'Reset demo'],
        },
      ],
      policy: [
        { code: 'D-104', label: 'Coverage exclusion', detail: 'The plan excludes this category unless an exception is granted.' },
        { code: 'D-208', label: 'Waiting period', detail: 'The benefit is not active until the waiting period ends.' },
        { code: 'D-311', label: 'Exception review', detail: 'A supervisor can confirm whether a special-case override applies.' },
      ],
      email: [
        { from: 'noah.lee@contoso.com', subject: 'Coverage denial needs clarification', status: 'Urgent', tag: 'Coverage' },
        { from: 'anna.roy@contoso.com', subject: 'Customer disputes policy interpretation', status: 'New', tag: 'Review' },
      ],
      tasks: [
        { title: 'Coverage review', queue: 'Policy queue', owner: 'Agent C', status: 'Open' },
        { title: 'Exception review', queue: 'Compliance queue', owner: 'Agent D', status: 'Pending' },
      ],
    },
    access: {
      title: 'Access denial explanation',
      customer: 'I was told my access request was denied and I need to know what requirement was missing.',
      assistant: 'I would verify identity, explain the missing requirement, and provide the path to reapply or appeal.',
      reasons: [
        'Access denials are sensitive and require identity verification before details are shared.',
        'The response should explain the missing condition without exposing restricted internal rules.',
        'Suggested tone: secure, concise, and helpful.',
      ],
      replies: ['Verify identity', 'Explain missing requirement', 'Start appeal path'],
      flow: [
        {
          customer: 'I was told my access request was denied and I need to know what requirement was missing.',
          assistant: 'I would verify identity, explain the missing requirement, and provide the path to reapply or appeal.',
          replies: ['Verify identity', 'Explain missing requirement', 'Start appeal path'],
        },
        {
          customer: 'I have verified my identity. What exactly was missing?',
          assistant: 'The request was denied because the eligibility check was incomplete. I can show the next steps to resubmit.',
          replies: ['Show next steps', 'Open appeal path', 'Reset demo'],
        },
        {
          customer: 'Please open the appeal path and send me the resubmission steps.',
          assistant: 'Done. I have prepared the appeal instructions and routed the case for follow-up.',
          replies: ['Keep as example', 'Reset demo'],
        },
      ],
      policy: [
        { code: 'D-110', label: 'Identity check incomplete', detail: 'The request cannot move forward until verification is completed.' },
        { code: 'D-211', label: 'Eligibility gap', detail: 'The access rule was not met at the time of review.' },
        { code: 'D-320', label: 'Appeal eligible', detail: 'The customer can resubmit once the missing requirement is addressed.' },
      ],
      email: [
        { from: 'sara.cho@contoso.com', subject: 'Denied access request clarification', status: 'New', tag: 'Access' },
        { from: 'michael.owen@contoso.com', subject: 'Need appeal steps for missing requirement', status: 'Follow up', tag: 'Appeals' },
      ],
      tasks: [
        { title: 'Identity verification', queue: 'Security queue', owner: 'Agent E', status: 'Open' },
        { title: 'Appeal instructions', queue: 'Self-service queue', owner: 'Bot', status: 'Ready' },
      ],
    },
    returns: {
      title: 'Appeal denial explanation',
      customer: 'I want to appeal the denial but I need the reason broken down in simple terms.',
      assistant: 'I would summarize the denial reason, cite the policy section, and prepare the appeal packet.',
      reasons: [
        'Appeals work best when the denial is explained with one clear policy summary.',
        'The workflow should capture the request for reconsideration and attach the original case details.',
        'Suggested tone: empathetic and structured.',
      ],
      replies: ['Summarize denial', 'Prepare appeal packet', 'Route to reviewer'],
      flow: [
        {
          customer: 'I want to appeal the denial but I need the reason broken down in simple terms.',
          assistant: 'I would summarize the denial reason, cite the policy section, and prepare the appeal packet.',
          replies: ['Summarize denial', 'Prepare appeal packet', 'Route to reviewer'],
        },
        {
          customer: 'Please summarize the denial and give me the appeal packet checklist.',
          assistant: 'The denial was based on D-120. I can attach the original decision, notes, and supporting documents for the reviewer.',
          replies: ['Prepare packet', 'Route to reviewer', 'Reset demo'],
        },
        {
          customer: 'Please route it to the reviewer and close out the explanation.',
          assistant: 'Done. The appeal case is queued for senior review with the denial summary attached.',
          replies: ['Keep as example', 'Reset demo'],
        },
      ],
      policy: [
        { code: 'D-120', label: 'Appeal summary', detail: 'Explain the denial in one paragraph before collecting the appeal packet.' },
        { code: 'D-240', label: 'Attachment needed', detail: 'The reviewer needs the original decision, notes, and supporting documents.' },
        { code: 'D-350', label: 'Review queue', detail: 'The case should be queued for a senior reviewer after intake.' },
      ],
      email: [
        { from: 'lisa.wong@contoso.com', subject: 'Appeal request for denied case', status: 'Urgent', tag: 'Appeals' },
        { from: 'tom.adams@contoso.com', subject: 'Need a simpler denial summary', status: 'New', tag: 'Summary' },
      ],
      tasks: [
        { title: 'Appeal intake', queue: 'Appeals queue', owner: 'Agent F', status: 'Open' },
        { title: 'Policy summary', queue: 'Knowledge queue', owner: 'Bot', status: 'Queued' },
      ],
    },
  },
  messages: [],
};

const chatThread = document.getElementById('chatThread');
const quickReplies = document.getElementById('quickReplies');
const assistantCard = document.getElementById('assistantCard');
const reasonList = document.getElementById('reasonList');
const policyList = document.getElementById('policyList');
const emailList = document.getElementById('emailList');
const taskList = document.getElementById('taskList');
const stageNote = document.getElementById('stageNote');
const chatForm = document.getElementById('chatForm');
const chatInput = document.getElementById('chatInput');
const scenarioButtons = Array.from(document.querySelectorAll('.scenario'));

const storageKey = 'free-contact-center-demo-state';

function loadState() {
  const raw = localStorage.getItem(storageKey);
  if (!raw) return;

  try {
    const parsed = JSON.parse(raw);
    if (parsed.scenario && state.conversations[parsed.scenario]) {
      state.scenario = parsed.scenario;
    }
    if (Number.isInteger(parsed.flowStage)) {
      state.flowStage = parsed.flowStage;
    }
    if (Array.isArray(parsed.messages)) {
      state.messages = parsed.messages;
    }
    if (Array.isArray(parsed.outboundLog)) {
      state.outboundLog = parsed.outboundLog;
    }
  } catch {
    localStorage.removeItem(storageKey);
  }
}

function saveState() {
  localStorage.setItem(
    storageKey,
    JSON.stringify({ scenario: state.scenario, flowStage: state.flowStage, messages: state.messages.slice(-12), outboundLog: state.outboundLog.slice(-40) }),
  );
}

function formatTime(date = new Date()) {
  return date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
}

function activeScenario() {
  return state.conversations[state.scenario];
}

function activeFlow() {
  const scenario = activeScenario();
  return scenario.flow || [];
}

function renderChat() {
  const scenario = activeScenario();
  const flow = activeFlow();
  const stage = Math.min(state.flowStage, Math.max(flow.length - 1, 0));
  const currentStep = flow[stage] || {
    customer: scenario.customer,
    assistant: scenario.assistant,
    replies: scenario.replies,
  };
  const baseMessages = [
    { role: 'customer', text: currentStep.customer, time: '09:14' },
    { role: 'agent', text: currentStep.assistant, time: '09:15' },
    ...state.messages,
  ];

  stageNote.innerHTML = `
    <strong>Conversation stage ${Math.min(stage + 1, Math.max(flow.length, 1))} of ${Math.max(flow.length, 1)}</strong>
    <span>Use the shortcut buttons to move the denial conversation forward.</span>
  `;

  chatThread.innerHTML = baseMessages
    .map((message) => {
      const role = message.role || 'system';
      return `
        <div class="bubble ${role}">
          <small>${role === 'customer' ? 'Customer' : role === 'agent' ? 'Agent assistant' : 'System'}</small>
          <div>${escapeHtml(message.text)}</div>
          <small>${message.time || formatTime()}</small>
        </div>
      `;
    })
    .join('');

  quickReplies.innerHTML = currentStep.replies
    .map(
      (reply) => `<button type="button" data-reply="${escapeAttr(reply)}">${escapeHtml(reply)}</button>`,
    )
    .join('');

  quickReplies.querySelectorAll('button').forEach((button) => {
    button.addEventListener('click', () => advanceFlow(button.dataset.reply));
  });
}

function renderAssistant() {
  const scenario = activeScenario();
  assistantCard.innerHTML = `
    <h3>${escapeHtml(scenario.title)}</h3>
    <p>${escapeHtml(scenario.assistant)}</p>
  `;

  reasonList.innerHTML = scenario.reasons
    .map((reason) => `<div class="reason">${escapeHtml(reason)}</div>`)
    .join('');
}

function renderPolicy() {
  const scenario = activeScenario();
  policyList.innerHTML = scenario.policy
    .map(
      (item) => `
        <div class="policy-item">
          <div class="policy-top">
            <span class="badge">${escapeHtml(item.code)}</span>
            <strong>${escapeHtml(item.label)}</strong>
          </div>
          <p>${escapeHtml(item.detail)}</p>
        </div>
      `,
    )
    .join('');
}

function renderEmails() {
  const scenario = activeScenario();
  emailList.innerHTML = scenario.email
    .map(
      (email, index) => `
        <div class="email-item ${index === 0 ? 'active' : ''}">
          <div class="email-top">
            <div>
              <div class="email-subject">${escapeHtml(email.subject)}</div>
              <div class="email-meta">From ${escapeHtml(email.from)}</div>
            </div>
            <span class="badge">${escapeHtml(email.status)}</span>
          </div>
          <div class="email-meta">Suggested tag: ${escapeHtml(email.tag)}</div>
          <div class="email-actions">
            <button type="button" data-email-action="reply">Reply</button>
            <button type="button" data-email-action="route">Route</button>
            <button type="button" data-email-action="archive">Archive</button>
          </div>
        </div>
      `,
    )
    .join('');

  emailList.querySelectorAll('button').forEach((button) => {
    button.addEventListener('click', () => {
      const action = button.dataset.emailAction;
      const parent = button.closest('.email-item');
      const subject = parent ? parent.querySelector('.email-subject')?.textContent.trim() : 'email';
      const from = parent ? parent.querySelector('.email-meta')?.textContent.replace(/^From\s*/i, '') : '';
      pushOutboundAction('Email', `${action} · ${subject} ${from ? '· ' + from : ''}`);
    });
  });
}

function renderTasks() {
  const scenario = activeScenario();
  taskList.innerHTML = scenario.tasks
    .map(
      (task) => `
        <div class="task-item">
          <div class="task-top">
            <div>
              <div class="task-title">${escapeHtml(task.title)}</div>
              <div class="task-meta">${escapeHtml(task.queue)} · ${escapeHtml(task.owner)}</div>
            </div>
            <span class="badge">${escapeHtml(task.status)}</span>
          </div>
          <div class="task-actions">
            <button type="button" data-task-action="assign">Assign</button>
            <button type="button" data-task-action="escalate">Escalate</button>
            <button type="button" data-task-action="close">Close</button>
          </div>
        </div>
      `,
    )
    .join('');

  taskList.querySelectorAll('button').forEach((button) => {
    button.addEventListener('click', () => {
      const action = button.dataset.taskAction;
      const details = `${action} on ${button.closest('.task-item').querySelector('.task-title')?.textContent || 'task'}`;
      pushOutboundAction('Task', `${action} · ${details}`);
    });
  });
}

function pushOutboundAction(type, details) {
  const entry = { time: formatTime(), type, details };
  state.outboundLog = state.outboundLog || [];
  state.outboundLog.unshift(entry);
  // Add a short system message for chat visibility as well
  state.messages.push({ role: 'system', text: `Outbound ${type}: ${details}`, time: entry.time });
  renderAll();
  renderOutboundLog();
  chatThread.scrollTop = chatThread.scrollHeight;
  saveState();
}

function renderOutboundLog() {
  const container = document.getElementById('outboundLog');
  if (!container) return;
  if (!state.outboundLog || state.outboundLog.length === 0) {
    container.innerHTML = `<div class="outbound-empty">No outbound actions yet. Actions will appear here when you click route, assign, or reply.</div>`;
    return;
  }

  container.innerHTML = state.outboundLog
    .slice(0, 40)
    .map(
      (e) => `
        <div class="outbound-entry">
          <div class="outbound-top"><strong class="outbound-type">${escapeHtml(e.type)}</strong><span class="outbound-time">${escapeHtml(e.time)}</span></div>
          <div class="outbound-details">${escapeHtml(e.details)}</div>
        </div>
      `,
    )
    .join('');
}

function updateScenario(scenario) {
  state.scenario = scenario;
  state.flowStage = 0;
  state.messages = [];
  scenarioButtons.forEach((button) => {
    button.classList.toggle('active', button.dataset.scenario === scenario);
  });
  renderAll();
  saveState();
}

function advanceFlow(action) {
  const flow = activeFlow();
  const nextStage = state.flowStage + 1;
  const currentStep = flow[nextStage] || null;

  if (action) {
    state.messages.push({ role: 'system', text: `Selected action: ${action}`, time: formatTime() });
  }

  if (/reset demo/i.test(action || '')) {
    updateScenario(state.scenario);
    return;
  }

  if (currentStep) {
    state.flowStage = nextStage;
    state.messages.push({ role: 'customer', text: currentStep.customer, time: formatTime() });
    state.messages.push({ role: 'agent', text: currentStep.assistant, time: formatTime() });
  } else {
    state.messages.push({ role: 'system', text: 'The scripted flow is complete. Choose Reset demo from the buttons or switch scenarios.', time: formatTime() });
  }

  renderAll();
  chatThread.scrollTop = chatThread.scrollHeight;
  saveState();
}

function sendMessage(text) {
  const value = text || chatInput.value.trim();
  if (!value) return;

  state.messages.push({ role: 'customer', text: value, time: formatTime() });
  state.messages.push({ role: 'agent', text: generateReply(value), time: formatTime() });
  chatInput.value = '';
  renderChat();
  chatThread.scrollTop = chatThread.scrollHeight;
  saveState();
}

function addSystemMessage(text) {
  state.messages.push({ role: 'system', text, time: formatTime() });
  renderChat();
  chatThread.scrollTop = chatThread.scrollHeight;
  saveState();
}

function generateReply(input) {
  const message = input.toLowerCase();
  if (/refund|charge|billing|invoice|claim/.test(message)) {
    return 'I can help explain the denial reason. Please share the claim or case number and I will route this for review.';
  }
  if (/delivery|shipping|tracking|package|coverage/.test(message)) {
    return 'I can check the policy basis now. If the customer disputes the rule, I will escalate it to review.';
  }
  if (/password|login|sign in|access|appeal/.test(message)) {
    return 'I can help with the explanation and appeal path. Please verify identity and I will share the next step.';
  }
  if (/return|damaged|replace|denial/.test(message)) {
    return 'I can break down the denial in simple terms and prepare the appeal summary for the reviewer.';
  }
  return 'Thanks. I will log this, review the denial reason, and route it to the right queue right away.';
}

function renderAll() {
  renderChat();
  renderAssistant();
  renderPolicy();
  renderEmails();
  renderTasks();
  renderOutboundLog();
}

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function escapeAttr(value) {
  return escapeHtml(value).replaceAll('`', '&#96;');
}

scenarioButtons.forEach((button) => {
  button.addEventListener('click', () => updateScenario(button.dataset.scenario));
});

chatForm.addEventListener('submit', (event) => {
  event.preventDefault();
  sendMessage();
});

loadState();
scenarioButtons.forEach((button) => {
  button.classList.toggle('active', button.dataset.scenario === state.scenario);
});
renderAll();
