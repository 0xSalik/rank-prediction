import { collegeCutoffs } from "./college_cutoffs";

class CollegePredictor {
  private colleges: CollegeCutoff[];

  constructor() {
    this.colleges = collegeCutoffs;
  }

  public getColleges(
    rank: number,
    category: CutoffCategory = "general"
  ): CollegeCutoff[] {
    const eligibleColleges = this.colleges.filter((college) => {
      if (category === "all") {
        return Object.values(college.cutoffs).some((cutoff) => {
          const cutoffRank = parseInt(cutoff || "0");
          return rank <= cutoffRank;
        });
      } else {
        const cutoffRank = parseInt(college.cutoffs[category] || "0");
        return rank <= cutoffRank;
      }
    });

    eligibleColleges.sort((a, b) => {
      if (category === "all") {
        const bestCutoffA = Math.min(
          ...Object.values(a.cutoffs).map((cutoff) => parseInt(cutoff || "0"))
        );
        const bestCutoffB = Math.min(
          ...Object.values(b.cutoffs).map((cutoff) => parseInt(cutoff || "0"))
        );
        return bestCutoffA - bestCutoffB;
      } else {
        const cutoffA = parseInt(a.cutoffs[category] || "0");
        const cutoffB = parseInt(b.cutoffs[category] || "0");
        return cutoffA - cutoffB;
      }
    });

    return eligibleColleges.slice(0, 20);
  }
}

export default CollegePredictor;
