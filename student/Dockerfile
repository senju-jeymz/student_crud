# Build stage using official Maven Alpine image
FROM maven:3.9.6-eclipse-temurin-21-alpine AS build
WORKDIR /app

# Restrict Maven heap to fit within Render free tier builder memory limit
ENV MAVEN_OPTS="-Xmx384m"

# Copy pom.xml and source code
COPY pom.xml .
COPY src ./src

# Compile and package Spring Boot JAR (skipping tests)
RUN mvn clean package -DskipTests

# Run stage with lightweight JRE 21
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app

COPY --from=build /app/target/*.jar app.jar

ENV PORT=8080
EXPOSE 8080

# Keep JVM heap bounded for Render 512MB instance
ENTRYPOINT ["sh", "-c", "java -Xmx350m -jar app.jar"]
