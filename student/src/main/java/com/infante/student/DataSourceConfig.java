package com.infante.student;

import com.zaxxer.hikari.HikariDataSource;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;

import javax.sql.DataSource;
import java.net.URI;

@Configuration
public class DataSourceConfig {

    @Value("${spring.datasource.url:#{null}}")
    private String configuredUrl;

    @Value("${spring.datasource.username:#{null}}")
    private String configuredUser;

    @Value("${spring.datasource.password:#{null}}")
    private String configuredPassword;

    @Bean
    @Primary
    public DataSource dataSource() {
        String rawUrl = System.getenv("SPRING_DATASOURCE_URL");
        if (rawUrl == null || rawUrl.isBlank()) {
            rawUrl = System.getenv("DATABASE_URL");
        }
        if (rawUrl == null || rawUrl.isBlank()) {
            rawUrl = configuredUrl;
        }

        HikariDataSource ds = new HikariDataSource();

        if (rawUrl != null && (rawUrl.startsWith("postgres://") || rawUrl.startsWith("postgresql://"))) {
            try {
                URI uri = new URI(rawUrl);
                String userInfo = uri.getUserInfo();
                String user = configuredUser;
                String pass = configuredPassword;

                if (userInfo != null && userInfo.contains(":")) {
                    String[] parts = userInfo.split(":", 2);
                    user = parts[0];
                    pass = parts[1];
                }

                String host = uri.getHost();
                int port = uri.getPort() > 0 ? uri.getPort() : 5432;
                String path = uri.getPath(); // /dbname

                String query = uri.getQuery();
                String sslParam = (query != null && query.contains("sslmode=")) ? "" : "?sslmode=require";
                if (query != null && !sslParam.isEmpty()) {
                    sslParam = "?" + query + "&sslmode=require";
                } else if (query != null) {
                    sslParam = "?" + query;
                }

                String jdbcUrl = "jdbc:postgresql://" + host + ":" + port + path + sslParam;

                ds.setJdbcUrl(jdbcUrl);
                ds.setUsername(user);
                ds.setPassword(pass);
                ds.setDriverClassName("org.postgresql.Driver");
                return ds;
            } catch (Exception ignored) {
                if (!rawUrl.startsWith("jdbc:")) {
                    rawUrl = "jdbc:" + rawUrl;
                }
            }
        }

        if (rawUrl != null && !rawUrl.startsWith("jdbc:")) {
            rawUrl = "jdbc:" + rawUrl;
        }

        ds.setJdbcUrl(rawUrl);
        if (configuredUser != null) ds.setUsername(configuredUser);
        if (configuredPassword != null) ds.setPassword(configuredPassword);
        ds.setDriverClassName("org.postgresql.Driver");

        return ds;
    }
}
