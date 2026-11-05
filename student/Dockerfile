# Build stage using official Maven Alpine image
FROM maven:3.9.6-eclipse-temurin-21-alpine AS build
WORKDIR /app

# Copy pom.xml and src directly
COPY pom.xml .
COPY src ./src

# Compile and package Spring Boot JAR
RUN mvn clean package -DskipTests

# Run stage with lightweight JRE
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app

COPY --from=build /app/target/*.jar app.jar

ENV PORT=8080
EXPOSE 8080

ENTRYPOINT ["sh", "-c", "if [ -n \"$SPRING_DATASOURCE_URL\" ]; then export SPRING_DATASOURCE_URL=$(echo \"$SPRING_DATASOURCE_URL\" | sed 's/^postgres:/jdbc:postgresql:/' | sed 's/^postgresql:/jdbc:postgresql:/'); fi && java -Dserver.port=${PORT:-8080} -jar app.jar"]
