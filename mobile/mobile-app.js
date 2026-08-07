import { AnatomyScene } from "../anatomy.js";
import {
  BODY_REGION_LABELS,
  CATEGORIES,
  INDICATORS,
  SOURCES,
  getIndicator,
  getIndicatorRegions,
} from "../data.js";

const state = {
  category: "all",
  query: "",
  selectedId: "fms-deep-squat",
  siteId: "all",
  view: "list",
};

const elements = {
  categoryTabs: document.querySelector("#category-tabs"),
  list: document.querySelector("#indicator-list"),
  empty: document.querySelector("#empty-state"),
  search: document.querySelector("#indicator-search"),
  resultCount: document.querySelector("#result-count"),
  activeFilterLabel: document.querySelector("#active-filter-label"),
  selectedCategory: document.querySelector("#selected-category"),
  selectedTitle: document.querySelector("#selected-title"),
  primaryReadout: document.querySelector("#primary-readout"),
  secondaryReadout: document.querySelector("#secondary-readout"),
  detailIndex: document.querySelector("#detail-index"),
  detailTitle: document.querySelector("#detail-title"),
  evidenceGrade: document.querySelector("#evidence-grade"),
  detailRange: document.querySelector("#detail-range"),
  detailTarget: document.querySelector("#detail-target"),
  detailRisk: document.querySelector("#detail-risk"),
  detailSummary: document.querySelector("#detail-summary"),
  detailPrimary: document.querySelector("#detail-primary"),
  detailSecondary: document.querySelector("#detail-secondary"),
  detailEvidence: document.querySelector("#detail-evidence"),
  sourceList: document.querySelector("#source-list"),
  siteWrap: document.querySelector("#site-selector-wrap"),
  siteSelector: document.querySelector("#site-selector"),
};

const anatomy = new AnatomyScene(
  document.querySelector("#anatomy-canvas"),
  document.querySelector("#anatomy-tooltip"),
);

function categoryFor(id) {
  return CATEGORIES.find((category) => category.id === id) ?? CATEGORIES[0];
}

function searchableText(indicator) {
  const regionLabels = [...indicator.primaryRegions, ...indicator.secondaryRegions]
    .map((key) => BODY_REGION_LABELS[key] ?? "")
    .join(" ");
  return [
    indicator.title,
    indicator.summary,
    indicator.primaryText,
    indicator.secondaryText,
    regionLabels,
  ].join(" ").toLowerCase();
}

function filteredIndicators() {
  const query = state.query.trim().toLowerCase();
  return INDICATORS.filter((indicator) => {
    const categoryMatches = state.category === "all" || indicator.category === state.category;
    return categoryMatches && (!query || searchableText(indicator).includes(query));
  });
}

function renderCategories() {
  elements.categoryTabs.replaceChildren();
  for (const category of CATEGORIES) {
    const count = category.id === "all"
      ? INDICATORS.length
      : INDICATORS.filter((indicator) => indicator.category === category.id).length;
    const button = document.createElement("button");
    button.type = "button";
    button.className = `category-tab${state.category === category.id ? " active" : ""}`;
    button.dataset.category = category.id;
    button.setAttribute("aria-pressed", String(state.category === category.id));
    button.textContent = `${category.short} ${count}`;
    elements.categoryTabs.append(button);
  }
}

function renderList() {
  const indicators = filteredIndicators();
  elements.resultCount.textContent = String(indicators.length);
  elements.empty.hidden = indicators.length > 0;
  elements.activeFilterLabel.textContent = categoryFor(state.category).label;
  elements.list.replaceChildren();

  for (const indicator of indicators) {
    const index = INDICATORS.indexOf(indicator) + 1;
    const button = document.createElement("button");
    button.type = "button";
    button.className = `indicator-item${state.selectedId === indicator.id ? " active" : ""}`;
    button.dataset.indicatorId = indicator.id;
    button.setAttribute("role", "option");
    button.setAttribute("aria-selected", String(state.selectedId === indicator.id));

    const code = document.createElement("span");
    code.className = "indicator-code";
    code.textContent = String(index).padStart(2, "0");
    const title = document.createElement("strong");
    title.textContent = indicator.title;
    const mapping = document.createElement("small");
    mapping.textContent = indicator.primaryText;
    const arrow = document.createElement("i");
    arrow.dataset.lucide = "chevron-right";
    button.append(code, title, mapping, arrow);
    elements.list.append(button);
  }
  renderIcons();
}

function renderSources(indicator) {
  elements.sourceList.replaceChildren();
  for (const sourceId of indicator.sources) {
    const source = SOURCES[sourceId];
    if (!source) continue;
    const link = document.createElement("a");
    link.className = "source-link";
    link.href = source.url;
    link.target = "_blank";
    link.rel = "noreferrer noopener";

    const copy = document.createElement("span");
    const short = document.createElement("strong");
    short.textContent = source.short;
    const type = document.createElement("small");
    type.textContent = source.type;
    copy.append(short, type);
    const icon = document.createElement("i");
    icon.dataset.lucide = "external-link";
    link.append(copy, icon);
    elements.sourceList.append(link);
  }
}

function renderSiteSelector(indicator) {
  const hasSites = Array.isArray(indicator.sites);
  elements.siteWrap.hidden = !hasSites;
  elements.siteSelector.replaceChildren();
  if (!hasSites) {
    state.siteId = "all";
    return;
  }

  if (!indicator.sites.some((site) => site.id === state.siteId)) {
    state.siteId = indicator.sites[0].id;
  }
  for (const site of indicator.sites) {
    const option = document.createElement("option");
    option.value = site.id;
    option.textContent = site.label;
    option.selected = site.id === state.siteId;
    elements.siteSelector.append(option);
  }
}

function renderDetail() {
  const indicator = getIndicator(state.selectedId);
  const category = categoryFor(indicator.category);
  const index = INDICATORS.indexOf(indicator) + 1;
  const regions = getIndicatorRegions(indicator, state.siteId);
  const selectedSite = indicator.sites?.find((site) => site.id === state.siteId);
  const primaryText = selectedSite && selectedSite.id !== "all"
    ? `${selectedSite.label}：${regions.primary.map((key) => BODY_REGION_LABELS[key]).join("、")}`
    : indicator.primaryText;

  elements.selectedCategory.textContent = category.label;
  elements.selectedTitle.textContent = indicator.title;
  elements.primaryReadout.textContent = primaryText;
  elements.secondaryReadout.textContent = indicator.secondaryText;
  elements.detailIndex.textContent = `${category.short.toUpperCase()} · ${String(index).padStart(2, "0")}`;
  elements.detailTitle.textContent = indicator.title;
  elements.evidenceGrade.textContent = indicator.evidenceGrade;
  elements.detailRange.textContent = `${indicator.range} · ${indicator.unit}`;
  elements.detailTarget.textContent = indicator.target;
  elements.detailRisk.textContent = indicator.risk;
  elements.detailSummary.textContent = indicator.summary;
  elements.detailPrimary.textContent = primaryText;
  elements.detailSecondary.textContent = indicator.secondaryText;
  elements.detailEvidence.textContent = indicator.evidence;

  renderSiteSelector(indicator);
  renderSources(indicator);
  anatomy.setHighlighted(regions.primary, regions.secondary);
  renderIcons();
}

function renderView() {
  document.querySelectorAll("[data-view]").forEach((button) => {
    const active = button.dataset.view === state.view;
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", String(active));
  });
  document.querySelectorAll("[data-panel]").forEach((panel) => {
    const active = panel.dataset.panel === state.view;
    panel.hidden = !active;
    panel.classList.toggle("active", active);
    if (active) panel.scrollTop = 0;
  });
}

function selectIndicator(id) {
  state.selectedId = id;
  state.siteId = "all";
  state.view = "detail";
  renderList();
  renderDetail();
  renderView();
}

function renderIcons() {
  window.lucide?.createIcons({ attrs: { "stroke-width": 1.8 } });
}

document.querySelector(".view-switcher").addEventListener("click", (event) => {
  const button = event.target.closest("[data-view]");
  if (!button) return;
  state.view = button.dataset.view;
  renderView();
});

elements.categoryTabs.addEventListener("click", (event) => {
  const button = event.target.closest("[data-category]");
  if (!button) return;
  state.category = button.dataset.category;
  renderCategories();
  renderList();
});

elements.list.addEventListener("click", (event) => {
  const button = event.target.closest("[data-indicator-id]");
  if (!button) return;
  selectIndicator(button.dataset.indicatorId);
});

elements.search.addEventListener("input", (event) => {
  state.query = event.target.value;
  renderList();
});

elements.siteSelector.addEventListener("change", (event) => {
  state.siteId = event.target.value;
  renderDetail();
});

document.querySelectorAll("[data-layer]").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll("[data-layer]").forEach((item) => {
      const active = item === button;
      item.classList.toggle("active", active);
      item.setAttribute("aria-pressed", String(active));
    });
    anatomy.setLayerMode(button.dataset.layer);
  });
});

document.querySelector("#reset-view").addEventListener("click", () => anatomy.resetView());
document.querySelector("#auto-rotate").addEventListener("click", (event) => {
  const active = anatomy.toggleAutoRotate();
  event.currentTarget.classList.toggle("active", active);
  event.currentTarget.setAttribute("aria-pressed", String(active));
});

document.querySelector("#indicator-total").textContent = String(INDICATORS.length);
renderCategories();
renderList();
renderDetail();
renderView();
renderIcons();

window.__injuryAtlas = {
  anatomy,
  getState: () => ({ ...state }),
  selectIndicator,
  setView: (view) => {
    if (!['list', 'detail'].includes(view)) return;
    state.view = view;
    renderView();
  },
};
