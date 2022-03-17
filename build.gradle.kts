plugins {
    kotlin("js") version "1.6.20-M1"
    kotlin("plugin.serialization") version "1.6.20-M1"
}

group = "org.example"
version = "1.0-SNAPSHOT"

repositories {
    mavenCentral()
}

kotlin {
    js {
        browser {
            commonWebpackConfig {
                cssSupport.enabled = true
            }
        }
        binaries.executable()
    }
}

dependencies {
    implementation("org.jetbrains.kotlin-wrappers:kotlin-react:17.0.2-pre.297-kotlin-1.6.10")
    implementation("org.jetbrains.kotlin-wrappers:kotlin-react-dom:17.0.2-pre.297-kotlin-1.6.10")
    implementation("org.jetbrains.kotlin-wrappers:kotlin-react-router-dom:6.2.1-pre.319-kotlin-1.6.10")
    implementation("org.jetbrains.kotlin-wrappers:kotlin-styled:5.3.3-pre.319-kotlin-1.6.10")
    implementation(npm("react", "17.0.2"))
    implementation(npm("react-dom", "17.0.2"))
    implementation("org.jetbrains.kotlin-wrappers:kotlin-react-css:17.0.2-pre.298-kotlin-1.6.10")
    implementation(npm("react-youtube-lite", "1.5.0"))
    implementation(npm("react-share", "4.4.0"))
    implementation("org.jetbrains.kotlinx:kotlinx-coroutines-core:1.6.0")
    implementation("org.jetbrains.kotlinx:kotlinx-serialization-json:1.3.2")
    implementation("com.fasterxml.jackson.module:jackson-module-kotlin:2.8.9")
    implementation("io.vertx:vertx-core:3.5.3")
}
