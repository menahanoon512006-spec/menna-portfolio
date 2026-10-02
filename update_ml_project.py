path_trans = r'C:\Users\Lenovo\.gemini\antigravity\scratch\menna-portfolio\js\translations.js'
with open(path_trans, 'r', encoding='utf-8') as f:
    trans = f.read()

# 1. Update translations.en for proj2
old_en = '''    // Project 2
    proj2Title: "House Price Prediction Model",
    proj2Subtitle: "End-to-End Machine Learning Regression Pipeline",
    proj2Status: "End-to-End ML Pipeline",
    proj2Specs: "Regression Pipeline • Scikit-Learn • R² 0.894",
    proj2Desc: "Built an end-to-end machine learning model to predict residential house prices using Python, pandas, and scikit-learn for data wrangling, feature engineering, model training, and performance metrics evaluation.",
    proj2Feat1: "End-to-end regression model with data preprocessing & scaling",
    proj2Feat2: "In-depth EDA, correlation heatmaps & feature importance analysis",
    proj2Feat3: "Achieved 89.4% prediction accuracy (R²) with minimized RMSE",'''

new_en = '''    // Project 2
    proj2Title: "Real Estate Valuation & Price Prediction",
    proj2Subtitle: "Interactive ML Model & Property Valuation App",
    proj2Status: "Interactive ML Web App",
    proj2Specs: "Supervised ML • Scikit-Learn • Real-Time Valuation",
    proj2Desc: "Developed an interactive property valuation web application powered by machine learning regression. The system ingests property features (carpet area, location, floors, furnishing, ownership) to estimate residential market value in real time.",
    proj2Feat1: "Interactive valuation interface taking property features (area, location, floors, furnishing)",
    proj2Feat2: "Trained supervised regression model using scikit-learn with feature preprocessing & encoding",
    proj2Feat3: "Calculates instant property market valuation with structured ledger & metrics",'''

if old_en in trans:
    trans = trans.replace(old_en, new_en)
    print("Updated English translations for proj2")
else:
    print("Warning: old_en not matched directly!")

# 2. Update translations.ar for proj2
old_ar = '''    // Project 2
    proj2Title: "نموذج التنبؤ بأسعار المنازل",
    proj2Subtitle: "بناء مسار تعلم آلة انحداري متكامل (Regression Pipeline)",
    proj2Status: "مسار تعلم آلة متكامل",
    proj2Specs: "نموذج انحدار • بايثون و Scikit-Learn • دقة 89.4%",
    proj2Desc: "تطوير نموذج تعلم آلة متكامل للتنبؤ بأسعار العقارات السكنية باستخدام لغة بايثون ومكتبات pandas و scikit-learn لمعالجة وتجهيز البيانات وتدريب وتقييم النموذج.",
    proj2Feat1: "بناء مسار انحدار متكامل يشمل تنظيف البيانات وهندسة الخصائص",
    proj2Feat2: "تحليل استكشافي شامل للبيانات ومصفوفات ارتباط الخصائص الرئيسية",
    proj2Feat3: "تحقيق دقة تنبؤ عالية بمعامل تحديد R² بلغ 0.894 وتقييم معايير الخطأ",'''

new_ar = '''    // Project 2
    proj2Title: "تقدير القيمة السوقية وأسعار العقارات",
    proj2Subtitle: "تطبيق ويب تفاعلي لتعلم الآلة وحساب أسعار العقارات",
    proj2Status: "تطبيق ويب تفاعلي لتعلم الآلة",
    proj2Specs: "تعلم آلة خاضع للإشراف • Scikit-Learn • تقييم فوري",
    proj2Desc: "تطوير تطبيق ويب تفاعلي متكامل لتقدير القيمة السوقية للعقارات السكنية عبر نماذج انحدار تعلم الآلة. يستقبل النظام مواصفات العقار (المساحة، الموقع، الأدوار، حالة التأثيث، ونوع الملكية) ليحسب القيمة العادلة فورياً.",
    proj2Feat1: "واجهة إدخال تفاعلية تستقبل مواصفات العقار بدقة (المساحة، الموقع، الأدوار، التأثيث)",
    proj2Feat2: "تدريب نموذج انحدار خاضع للإشراف عبر scikit-learn مع المعالجة المسبقة وترميز البيانات",
    proj2Feat3: "حساب القيمة التقديرية للعقار فورياً مع سجل تدقيق تفصيلي شامل للبيانات (Ledger)",'''

if old_ar in trans:
    trans = trans.replace(old_ar, new_ar)
    print("Updated Arabic translations for proj2")
else:
    print("Warning: old_ar not matched directly!")

# 3. Update projectDetails.proj2 with gallery and rich details
old_proj2_details = '''  proj2: {
    image: "assets/projects/house-prediction.jpg",
    en: {
      title: "House Price Prediction Model",
      subtitle: "Supervised Machine Learning Regression Pipeline",
      category: "Machine Learning & Data Science",
      overview: "Constructed an end-to-end regression machine learning workflow to accurately forecast residential property valuations based on geographical, structural, and socio-economic attributes.",
      highlights: [
        "Performed exploratory data analysis (EDA), handling missing entries, numerical outliers, and feature skewness with pandas and NumPy.",
        "Engineered categorical encodings and normalized continuous features using scikit-learn transformers.",
        "Trained, compared, and tuned multiple regression algorithms (Linear Regression, Ridge/Lasso, and Tree ensembles) assessing RMSE and R² scores.",
        "Documented findings and published clean, structured Jupyter notebooks on GitHub with version-controlled commits."
      ],
      technologies: ["Python", "scikit-learn", "pandas", "NumPy", "Matplotlib", "Seaborn", "Jupyter Notebook", "Git"],
      githubUrl: "https://github.com/menahanoon512006-spec/house-project-prediction"
    },
    ar: {
      title: "نموذج التنبؤ بأسعار المنازل",
      subtitle: "مسار انحدار متكامل في تعلم الآلة الخاضع للإشراف",
      category: "تعلم الآلة وعلم البيانات",
      overview: "بناء مسار تعلم آلة تنبؤي كامل للتنبؤ بأسعار العقارات السكنية بناءً على الخصائص الجغرافية، والمواصفات المعمارية، والمعايير الاقتصادية.",
      highlights: [
        "إجراء استكشاف شامل للبيانات (EDA)، ومعالجة القيم المفقودة والبيانات الشاذة باستخدام مكتبتي pandas و NumPy.",
        "تطبيق تقنيات هندسة الميزات وتحويل المتغيرات النصية والتطبيع العددي عبر scikit-learn.",
        "تدريب واختبار عدة خوارزميات انحدار ومقارنة دقتها وتقييم النتائج باستخدام مقاييس RMSE و R².",
        "نشر المشروع بالكامل وتوثيقه على منصة GitHub مع إدارة الإصدارات عبر Git."
      ],
      technologies: ["Python", "scikit-learn", "pandas", "NumPy", "Matplotlib", "Seaborn", "Jupyter Notebook", "Git"],
      githubUrl: "https://github.com/menahanoon512006-spec/house-project-prediction"
    }
  },'''

new_proj2_details = '''  proj2: {
    image: "assets/projects/house-prediction.jpg",
    gallery: [
      { src: "assets/projects/house-prediction.jpg", label: "Property Details Form & Live Ledger" },
      { src: "assets/projects/house-valuation-result.jpg", label: "Estimated Market Valuation Output ($12.8M)" }
    ],
    en: {
      title: "Real Estate Valuation & Price Prediction",
      subtitle: "Supervised Machine Learning Regression & Interactive Web App",
      category: "Machine Learning & Data Science",
      overview: "A full-fledged Machine Learning web application designed to evaluate and predict residential property values. Users input key real estate parameters—such as location, carpet area (sqft), floor level, total building floors, balcony count, furnishing state, transaction type, and legal ownership. The backend regression model processes and encodes these features to deliver an instant, accurate market valuation ($12,899,454.53) alongside a structured property ledger.",
      highlights: [
        "Constructed a supervised machine learning regression pipeline with pandas and scikit-learn.",
        "Handled data wrangling, missing values, categorical encoding for location and furnishing, and feature scaling.",
        "Designed an intuitive user interface with two-column layout: property input form and structured ledger.",
        "Integrated model inference to output instant real-time valuation metrics upon form submission.",
        "Evaluated model performance using Mean Absolute Error (MAE), Root Mean Squared Error (RMSE), and R² score."
      ],
      technologies: ["Python", "scikit-learn", "pandas", "NumPy", "Interactive UI", "Machine Learning", "Jupyter Notebook", "Git"],
      githubUrl: "https://github.com/menahanoon512006-spec/house-project-prediction"
    },
    ar: {
      title: "تقدير القيمة السوقية وأسعار العقارات",
      subtitle: "تطبيق ويب تفاعلي لأنظمة تعلم الآلة مع نموذج انحدار تنبؤي",
      category: "تعلم الآلة وعلم البيانات",
      overview: "تطبيق ويب متكامل لأنظمة تعلم الآلة مصمم لتقدير وحساب القيمة السوقية العادلة للعقارات السكنية بدقة. يتيح التطبيق للمستخدم إدخال المعايير الأساسية للعقار—مثل الموقع الجغرافي، المساحة بالقدم المربع (Carpet Area)، رقم الطابق، إجمالي أدوار المبنى، عدد الشرفات، حالة التأثيث، نوع المعاملة، وحالة الملكية. يقوم نموذج الانحدار بمعالجة وتشفير هذه البيانات لتقديم تقييم مالي فوري للعقار مع سجل تفصيلي منظم للبيانات.",
      highlights: [
        "بناء وتدريب مسار انحدار متكامل في تعلم الآلة باستخدام مكتبات Python و scikit-learn و pandas.",
        "معالجة وتجهيز البيانات، والتعامل مع القيم المفقودة، وترميز المتغيرات الفئوية (الموقع، نوع الملكية، التأثيث).",
        "تصميم واجهة مستخدم عصرية مقسمة لعمودين: نموذج الإدخال وسجل مطابقة مواصفات العقار (Ledger).",
        "ربط واجهة الاستنتاج الفوري لحساب وتقدير القيمة السعرية مباشرة عند الضغط على زر Get Valuation.",
        "تقييم أداء النموذج بدقة باستخدام مقاييس معامل التحديد R² ومتوسط مربعات الخطأ RMSE."
      ],
      technologies: ["Python", "scikit-learn", "pandas", "NumPy", "واجهة تفاعلية", "Machine Learning", "Jupyter Notebook", "Git"],
      githubUrl: "https://github.com/menahanoon512006-spec/house-project-prediction"
    }
  },'''

if old_proj2_details in trans:
    trans = trans.replace(old_proj2_details, new_proj2_details)
    print("Updated projectDetails.proj2 with gallery and rich content")
else:
    print("Warning: old_proj2_details not matched directly!")

with open(path_trans, 'w', encoding='utf-8') as f:
    f.write(trans)
print("translations.js updated successfully!")
