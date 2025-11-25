(() => {
  const scriptEl = document.currentScript;
  const apiBase = normalizeBase(scriptEl?.dataset.apiBase ?? '');
  const containerId = scriptEl?.dataset.agentContainer;
  const shouldAutoInit = (scriptEl?.dataset.autoInit ?? 'true') !== 'false';

  attachStyles(scriptEl);

  if (shouldAutoInit) {
    const boot = (targetEl) => {
      const mountTarget = targetEl ?? createFloatingMount();
      setupAgent(mountTarget, { apiBase });
    };
    runWhenReady(() => {
      const resolved = containerId ? document.getElementById(containerId) : null;
      boot(resolved);
    });
  }

  if (typeof window !== 'undefined') {
    window.PairAgent = window.PairAgent || {};
    window.PairAgent.mount = (target, opts = {}) => {
      runWhenReady(() => {
        const el = typeof target === 'string' ? document.querySelector(target) : target;
        if (!el) {
          throw new Error('PairAgent: Unable to find mount target.');
        }
        const overrideBase = normalizeBase(opts.apiBase ?? apiBase);
        setupAgent(el, { apiBase: overrideBase });
      });
    };
  }
})();

function attachStyles(scriptEl) {
  if (!scriptEl) return;
  const cssUrl = new URL('./agent.css', scriptEl.src).toString();
  if (!document.querySelector(`link[data-pair-agent-style="${cssUrl}"]`)) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = cssUrl;
    link.dataset.pairAgentStyle = cssUrl;
    document.head.appendChild(link);
  }
}

function createFloatingMount() {
  const trigger = document.createElement('button');
  trigger.className = 'pair-agent-floating-trigger';
  trigger.type = 'button';
  trigger.textContent = '✦';

  const panel = document.createElement('div');
  panel.className = 'pair-agent-floating-panel';
  panel.style.display = 'none';

  trigger.addEventListener('click', () => {
    const isOpen = panel.style.display === 'block';
    panel.style.display = isOpen ? 'none' : 'block';
  });

  document.body.appendChild(trigger);
  document.body.appendChild(panel);
  return panel;
}

const defaultCatalog = [
  {
    id: 'pair-aurora',
    name: 'Aurora Pair',
    description: 'Custom gradient sneakers built for everyday comfort.',
    basePrice: 129,
    defaultColor: 'Sunset',
    availableColors: ['Sunset', 'Ocean', 'Matte Black'],
    sizes: ['US 5', 'US 6', 'US 7', 'US 8', 'US 9', 'US 10', 'US 11', 'US 12'],
    productionEtaDays: 7
  },
  {
    id: 'pair-lumen',
    name: 'Lumen Pair',
    description: 'Reflective runner with lightweight knit upper.',
    basePrice: 149,
    defaultColor: 'Lunar Grey',
    availableColors: ['Lunar Grey', 'Volt', 'Night Sky'],
    sizes: ['US 6', 'US 7', 'US 8', 'US 9', 'US 10', 'US 11'],
    productionEtaDays: 5
  },
  {
    id: 'pair-orbit',
    name: 'Orbit Pair',
    description: 'Minimalist slip-on for casual wear or office days.',
    basePrice: 119,
    defaultColor: 'Graphite',
    availableColors: ['Graphite', 'Ivory', 'Forest'],
    sizes: ['US 5', 'US 6', 'US 7', 'US 8', 'US 9', 'US 10'],
    productionEtaDays: 4
  },
  {
    id: 'pair-atelier',
    name: 'Atelier Pair',
    description: 'Hand-finished leather pair for elevated looks.',
    basePrice: 199,
    defaultColor: 'Chestnut',
    availableColors: ['Chestnut', 'Midnight', 'Cinder'],
    sizes: ['US 6', 'US 7', 'US 8', 'US 9', 'US 10', 'US 11', 'US 12'],
    productionEtaDays: 12
  },
  {
    id: 'pair-play',
    name: 'Play Pair',
    description: 'Bold platform set designed for standout outfits.',
    basePrice: 159,
    defaultColor: 'Vivid Berry',
    availableColors: ['Vivid Berry', 'Citrus', 'Ice'],
    sizes: ['US 5', 'US 6', 'US 7', 'US 8', 'US 9'],
    productionEtaDays: 6
  }
];

function setupAgent(mount, options) {
  const card = document.createElement('div');
  card.className = 'pair-agent-card';
  mount.innerHTML = '';
  mount.appendChild(card);

  const state = {
    catalog: defaultCatalog,
    catalogLoaded: false,
    order: createEmptyOrder(),
    stepIndex: 0,
    submitting: false,
    submitError: null,
    successOrder: null
  };

  const steps = [
    { id: 'pair', label: 'Select pair' },
    { id: 'size', label: 'Sizing' },
    { id: 'details', label: 'Color & qty' },
    { id: 'contact', label: 'Contact' },
    { id: 'notes', label: 'Finalize' },
    { id: 'review', label: 'Review' }
  ];

  function render() {
    const progress = renderProgress(steps, state);
    const header = `
      <div class="pair-agent-header">
        <div class="pair-agent-pill">Pair ordering agent</div>
        <h2>Let’s build your pair</h2>
        <p>We’ll keep it quick—just ${steps.length} short steps.</p>
        <div class="pair-agent-progress">${progress}</div>
      </div>
    `;

    const body = `
      <div class="pair-agent-body">
        ${state.submitError ? `<div class="pair-agent-status" data-type="error">${state.submitError}</div>` : ''}
        ${state.successOrder ? renderSuccess(state) : renderStepContent(state, steps[state.stepIndex])}
      </div>
    `;

    const footer = state.successOrder
      ? `
        <div class="pair-agent-actions">
          <button class="pair-agent-button primary" data-action="restart">Start another order</button>
        </div>
      `
      : `
        <div class="pair-agent-actions">
          <button class="pair-agent-button secondary" data-action="back" ${state.stepIndex === 0 ? 'disabled' : ''}>
            Back
          </button>
          <button class="pair-agent-button primary" data-action="next" ${
            state.submitting ? 'disabled' : ''
          }>
            ${state.stepIndex === steps.length - 1 ? (state.submitting ? 'Sending...' : 'Submit order') : 'Next'}
          </button>
        </div>
      `;

    card.innerHTML = `${header}${body}${footer}`;
    attachStepListeners(card, state, steps, options, render);
  }

  render();
  loadCatalog(state, options, render);
}

function renderProgress(steps, state) {
  if (state.successOrder) {
    return steps
      .map(() => `<span data-complete="true"></span>`)
      .join('');
  }
  return steps
    .map((step, index) => {
      const isComplete = index <= state.stepIndex;
      return `<span data-complete="${isComplete}"></span>`;
    })
    .join('');
}

function renderStepContent(state, step) {
  switch (step.id) {
    case 'pair':
      return renderPairStep(state);
    case 'size':
      return renderSizeStep(state);
    case 'details':
      return renderDetailsStep(state);
    case 'contact':
      return renderContactStep(state);
    case 'notes':
      return renderNotesStep(state);
    case 'review':
      return renderReviewStep(state);
    default:
      return '<p>Unknown step.</p>';
  }
}

function renderPairStep(state) {
  if (!state.catalogLoaded && !state.catalog?.length) {
    return `<div class="pair-agent-loading">Loading catalog…</div>`;
  }

  const options = state.catalog
    .map(
      (item) => `
        <article class="pair-agent-option-card" data-value="${item.id}" data-selected="${
        state.order.pairType === item.id
      }">
          <h4>${item.name} <span class="pair-agent-pill">${formatCurrency(item.basePrice)}</span></h4>
          <small>${item.description}</small>
        </article>
      `
    )
    .join('');

  return `
    <div class="pair-agent-step">
      <p class="pair-agent-question">Which pair fits best right now?</p>
      <p class="pair-agent-status">Preview styles, pick a favorite, and we’ll customize from there.</p>
      <div class="pair-agent-list">${options}</div>
    </div>
  `;
}

function renderSizeStep(state) {
  const selected = getSelectedCatalog(state);
  if (!selected) {
    return `<div class="pair-agent-status" data-type="error">Choose a pair first so we can pull the right size grid.</div>`;
  }

  const sizeOptions = selected.sizes
    .map(
      (size) =>
        `<option value="${size}" ${state.order.size === size ? 'selected' : ''}>${size}</option>`
    )
    .join('');

  return `
    <div class="pair-agent-step">
      <p class="pair-agent-question">What size should we prep?</p>
      <div class="pair-agent-input">
        <label for="pair-size">Size</label>
        <select id="pair-size" name="size" required>${sizeOptions}</select>
      </div>
      <div class="pair-agent-status">
        ${selected.name} typically lands within ${selected.sizes[0]} – ${
    selected.sizes[selected.sizes.length - 1]
  }. Half sizes? Add that in the notes next.
      </div>
    </div>
  `;
}

function renderDetailsStep(state) {
  const selected = getSelectedCatalog(state);
  const colors = selected?.availableColors ?? ['Custom'];

  const colorOptions = colors
    .map(
      (color) =>
        `<option value="${color}" ${state.order.color === color ? 'selected' : ''}>${color}</option>`
    )
    .join('');

  return `
    <div class="pair-agent-step">
      <p class="pair-agent-question">Color and quantity</p>
      <div class="pair-agent-input">
        <label for="pair-color">Colorway</label>
        <select id="pair-color" name="color">${colorOptions}</select>
      </div>
      <div class="pair-agent-input">
        <label for="pair-quantity">Quantity</label>
        <input type="number" min="1" max="50" id="pair-quantity" name="quantity" value="${
          state.order.quantity
        }" required />
      </div>
    </div>
  `;
}

function renderContactStep(state) {
  return `
    <div class="pair-agent-step">
      <p class="pair-agent-question">Where should we send confirmation?</p>
      <div class="pair-agent-input">
        <label for="pair-name">Full name</label>
        <input id="pair-name" name="customerName" value="${state.order.customerName ?? ''}" required />
      </div>
      <div class="pair-agent-input">
        <label for="pair-email">Email</label>
        <input id="pair-email" name="email" type="email" value="${state.order.email ?? ''}" required />
      </div>
      <div class="pair-agent-input">
        <label for="pair-phone">Phone (optional)</label>
        <input id="pair-phone" name="phone" type="tel" value="${state.order.phone ?? ''}" />
      </div>
      <div class="pair-agent-input">
        <label for="pair-contact-pref">Preferred follow up</label>
        <select id="pair-contact-pref" name="contactPreference">
          ${['email', 'sms', 'call']
            .map(
              (value) =>
                `<option value="${value}" ${
                  state.order.contactPreference === value ? 'selected' : ''
                }>${value.toUpperCase()}</option>`
            )
            .join('')}
        </select>
      </div>
    </div>
  `;
}

function renderNotesStep(state) {
  return `
    <div class="pair-agent-step">
      <p class="pair-agent-question">Any extras before we wrap?</p>
      <div class="pair-agent-input">
        <label for="pair-notes">Notes (custom requests, timing, etc.)</label>
        <textarea id="pair-notes" name="notes" rows="4">${state.order.notes ?? ''}</textarea>
      </div>
      <div class="pair-agent-input">
        <label for="pair-urgency">Timeline</label>
        <select id="pair-urgency" name="urgency">
          ${['standard', 'rush']
            .map(
              (value) =>
                `<option value="${value}" ${
                  state.order.urgency === value ? 'selected' : ''
                }>${value === 'rush' ? 'Rush (48h surcharge)' : 'Standard (3-7 days)'}</option>`
            )
            .join('')}
        </select>
      </div>
      <div class="pair-agent-input">
        <label for="pair-budget">Target budget (optional)</label>
        <input id="pair-budget" name="budget" type="number" min="50" step="10" value="${
          state.order.budget ?? ''
        }" placeholder="e.g. 180" />
      </div>
    </div>
  `;
}

function renderReviewStep(state) {
  const selected = getSelectedCatalog(state);
  const summary = [
    ['Pair', selected ? selected.name : state.order.pairType ?? '—'],
    ['Size', state.order.size ?? '—'],
    ['Color', state.order.color ?? '—'],
    ['Quantity', state.order.quantity ?? '—'],
    ['Urgency', state.order.urgency ?? 'standard'],
    ['Contact', `${state.order.customerName ?? ''} · ${state.order.email ?? ''}`],
    ['Preference', state.order.contactPreference ?? 'email']
  ];

  return `
    <div class="pair-agent-step">
      <p class="pair-agent-question">Review & submit</p>
      <div class="pair-agent-summary">
        ${summary.map(([label, value]) => `<p><strong>${label}:</strong> ${value}</p>`).join('')}
      </div>
      <p class="pair-agent-status">Hit submit and we’ll send this straight to your inbox.</p>
    </div>
  `;
}

function renderSuccess(state) {
  const pairLabel =
    state.successOrder.catalogSnapshot?.name ?? state.successOrder.pairType ?? 'Your pair';
  return `
    <div class="pair-agent-step">
      <p class="pair-agent-question">We’ve got it! 🎉</p>
      <div class="pair-agent-summary">
        <p><strong>Order ID:</strong> ${state.successOrder.id}</p>
        <p><strong>Pair:</strong> ${pairLabel}</p>
        <p>
          We emailed a confirmation to ${state.successOrder.email}. Keep an eye out within the next business
          day for our design team’s follow up.
        </p>
      </div>
    </div>
  `;
}

function attachStepListeners(card, state, steps, options, render) {
  const nextBtn = card.querySelector('[data-action="next"]');
  const backBtn = card.querySelector('[data-action="back"]');
  const restartBtn = card.querySelector('[data-action="restart"]');

  if (nextBtn) {
    nextBtn.addEventListener('click', () => handleNext(card, state, steps, options, render));
  }
  if (backBtn) {
    backBtn.addEventListener('click', () => {
      state.submitError = null;
      if (state.stepIndex > 0) {
        state.stepIndex -= 1;
        render();
      }
    });
  }
  if (restartBtn) {
    restartBtn.addEventListener('click', () => {
      state.order = createEmptyOrder();
      state.stepIndex = 0;
      state.successOrder = null;
      state.submitError = null;
      render();
    });
  }

  const stepId = steps[state.stepIndex]?.id;
  if (stepId === 'pair') {
    card.querySelectorAll('.pair-agent-option-card').forEach((el) => {
      el.addEventListener('click', () => {
        const selected = state.catalog.find((item) => item.id === el.dataset.value);
        state.order.pairType = selected?.id;
        state.order.size = selected?.sizes?.[0] ?? state.order.size;
        state.order.color = selected?.defaultColor ?? state.order.color;
        state.submitError = null;
        render();
      });
    });
  }
}

function handleNext(card, state, steps, options, render) {
  if (state.successOrder) return;

  const stepId = steps[state.stepIndex]?.id;
  const handler = stepHandlers[stepId];
  if (!handler) return;

  const valid = handler(card, state);
  if (!valid) {
    state.submitError = 'Complete this step before continuing.';
    render();
    return;
  }

  state.submitError = null;
  if (stepId === 'review') {
    submitOrder(card, state, steps, options, render);
    return;
  }

  state.stepIndex = Math.min(state.stepIndex + 1, steps.length - 1);
  render();
}

const stepHandlers = {
  pair: (_card, state) => Boolean(state.order.pairType),
  size: (card, state) => {
    const size = card.querySelector('#pair-size')?.value;
    if (!size) return false;
    state.order.size = size;
    return true;
  },
  details: (card, state) => {
    const quantity = Number.parseInt(card.querySelector('#pair-quantity')?.value ?? '1', 10);
    const color = card.querySelector('#pair-color')?.value;
    if (!color || Number.isNaN(quantity) || quantity < 1) return false;
    state.order.quantity = quantity;
    state.order.color = color;
    return true;
  },
  contact: (card, state) => {
    const name = card.querySelector('#pair-name')?.value?.trim();
    const email = card.querySelector('#pair-email')?.value?.trim();
    const phone = card.querySelector('#pair-phone')?.value?.trim();
    const pref = card.querySelector('#pair-contact-pref')?.value;
    if (!name || !email) return false;
    state.order.customerName = name;
    state.order.email = email;
    state.order.phone = phone;
    state.order.contactPreference = pref;
    return true;
  },
  notes: (card, state) => {
    state.order.notes = card.querySelector('#pair-notes')?.value ?? '';
    state.order.urgency = card.querySelector('#pair-urgency')?.value ?? 'standard';
    const budgetValue = card.querySelector('#pair-budget')?.value;
    state.order.budget = budgetValue ? Number.parseInt(budgetValue, 10) : undefined;
    return true;
  },
  review: () => true
};

function submitOrder(card, state, steps, options, render) {
  const payload = {
    customerName: state.order.customerName,
    email: state.order.email,
    phone: state.order.phone,
    pairType: state.order.pairType,
    size: state.order.size,
    color: state.order.color,
    quantity: state.order.quantity,
    notes: state.order.notes,
    contactPreference: state.order.contactPreference,
    urgency: state.order.urgency,
    budget: state.order.budget
  };

  state.submitting = true;
  state.submitError = null;
  render();

  const ordersUrl = buildApiUrl(options.apiBase, '/api/orders');

  fetch(ordersUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  })
    .then(async (res) => {
      if (!res.ok) {
        const errBody = await res.json().catch(() => ({}));
        throw new Error(errBody.message ?? 'Unable to submit order');
      }
      return res.json();
    })
    .then((data) => {
      state.successOrder = data;
      state.stepIndex = steps.length - 1;
    })
    .catch((error) => {
      state.submitError = error.message ?? 'Submission error';
    })
    .finally(() => {
      state.submitting = false;
      render();
    });
}

// --- Helpers ---------------------------------------------------------------

function getSelectedCatalog(state) {
  return state.catalog.find((item) => item.id === state.order.pairType);
}

function createEmptyOrder() {
  return {
    pairType: null,
    size: null,
    color: null,
    quantity: 1,
    customerName: null,
    email: null,
    phone: null,
    contactPreference: 'email',
    notes: '',
    urgency: 'standard',
    budget: undefined
  };
}

function formatCurrency(amount) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(amount);
}

function loadCatalog(state, options, rerender) {
  const url = buildApiUrl(options.apiBase, '/api/catalog');

  fetch(url)
    .then((res) => {
      if (!res.ok) throw new Error('Failed to load catalog');
      return res.json();
    })
    .then((body) => {
      if (Array.isArray(body.data) && body.data.length) {
        state.catalog = body.data;
      }
    })
    .catch(() => {
      state.catalog = defaultCatalog;
    })
    .finally(() => {
      state.catalogLoaded = true;
      rerender();
    });
}

function buildApiUrl(base, path) {
  if (!base) return path;
  const normalizedBase = normalizeBase(base);
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${normalizedBase}${normalizedPath}`;
}

function normalizeBase(input) {
  if (!input) return '';
  return input.trim().replace(/\/+$/, '');
}

function runWhenReady(callback) {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', callback, { once: true });
  } else {
    callback();
  }
}
